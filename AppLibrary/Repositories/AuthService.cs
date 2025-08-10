// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Services\AuthService.cs
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Amazon.Extensions.CognitoAuthentication;
using AppLibrary.Interfaces;
using AppLibrary.Models.Account;
using AppLibrary.Models.Configuration;
using System.Reflection;

namespace DepNails.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAmazonCognitoIdentityProvider _cognitoClient;
        private readonly CognitoUserPool _userPool;
        private readonly string _clientId;
        private readonly string _userPoolId;
        private readonly string _clientSecret;

        public AuthService(IAmazonCognitoIdentityProvider cognitoClient, ApplicationSettings appSettings)
        {
            _cognitoClient = cognitoClient;
            var cognitoSettings = appSettings.Cognito;
            _userPoolId = cognitoSettings.UserPoolId;
            _clientId = cognitoSettings.AppClientId;
            _clientSecret = cognitoSettings.ClientSecret; 
            _userPool = new CognitoUserPool(_userPoolId, _clientId, _cognitoClient, _clientSecret);
        }

        public async Task<AuthResponse> SignUpAsync(AccountSignUpRequest request)
        {
            try
            {
                throw new NotImplementedException("SignUpAsync is not implemented yet. Please implement this method to handle user registration.");
                var userAttributes = new List<AttributeType>
                {
                    new AttributeType { Name = "email", Value = request.Email },
                    new AttributeType { Name = "name", Value = request.Name },
                    new AttributeType { Name = "phone_number", Value = request.PhoneNumber }
                };

                var signUpRequest = new SignUpRequest
                {
                    ClientId = _clientId,
                    Username = request.Email, // Changed from request.Username to request.Email
                    Password = request.Password,
                    UserAttributes = userAttributes,
                    SecretHash = ComputeSecretHash(_clientId, _clientSecret, request.Email) // Add this line
                };

                await _cognitoClient.SignUpAsync(signUpRequest); // No need to capture response if not used

                ////TEMP, NEED TO SET UP CONFIRM EMAIL
                //var confirmRequest = new AdminConfirmSignUpRequest
                //{
                //    UserPoolId = _userPool.PoolID,
                //    Username = request.Email
                //};
                //await _cognitoClient.AdminConfirmSignUpAsync(confirmRequest);

                // Return a meaningful AuthResponse, adjust as necessary for your application
                // This is a placeholder response. Cognito typically requires user confirmation first.
                return new AuthResponse
                {
                    IdToken = null,
                    AccessToken = null,
                    RefreshToken = null,
                    ExpiresIn = null,
                    TokenType = "Bearer"
                };
            }
            catch (Exception ex)
            {
                // Consider logging the exception details for better debugging
                // For example: _logger.LogError(ex, "Error during sign up for {Email}", request.Email);
                throw new Exception($"An error occurred during sign up: {ex.Message}", ex); // Rethrow with more context or a custom exception
            }
            
        }

        // Add this method to compute the secret hash
        private string ComputeSecretHash(string clientId, string clientSecret, string userName)
        {
            var keyByte = System.Text.Encoding.UTF8.GetBytes(clientSecret);
            var messageByte = System.Text.Encoding.UTF8.GetBytes(userName + clientId);
            using (var hmacsha256 = new System.Security.Cryptography.HMACSHA256(keyByte))
            {
                var hash = hmacsha256.ComputeHash(messageByte);
                return Convert.ToBase64String(hash);
            }
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {

            try
            {
                var secretHash = ComputeSecretHash(_clientId, _clientSecret, request.Email);

                var authRequest = new AdminInitiateAuthRequest
                {
                    UserPoolId = _userPoolId,
                    ClientId = _clientId,
                    AuthFlow = AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
                    AuthParameters = new Dictionary<string, string>
                {
                    { "USERNAME", request.Email },
                    { "PASSWORD", request.Password },
                    { "SECRET_HASH", secretHash }
                }
                };
                var authResponse = await _cognitoClient.AdminInitiateAuthAsync(authRequest);
                return new AuthResponse
                {
                    IdToken = authResponse.AuthenticationResult.IdToken,
                    AccessToken = authResponse.AuthenticationResult.AccessToken,
                    RefreshToken = authResponse.AuthenticationResult.RefreshToken,
                    ExpiresIn = authResponse.AuthenticationResult.ExpiresIn,
                    TokenType = authResponse.AuthenticationResult.TokenType ?? "Bearer"
                };
            }
            catch (AmazonCognitoIdentityProviderException ex) when (ex.ErrorCode == "NotAuthorizedException")
            {
                // Handle incorrect username or password specifically
                throw new Exception("Incorrect username or password.", ex);
            }
            catch (Exception ex)
            {
                // Log other exceptions
                throw new Exception($"An error occurred during login: {ex.Message}", ex);
            }
        }

        public async Task LogoutAsync(LogoutRequest request)
        {
            try
            {
                var globalSignOutRequest = new GlobalSignOutRequest
                {
                    AccessToken = request.AccessToken
                };
                await _cognitoClient.GlobalSignOutAsync(globalSignOutRequest);
            }
            catch (NotAuthorizedException)
            {
                // This specific exception is thrown if the access token is expired or invalid.
                // In this context, the user is effectively logged out, so we can treat this
                // as a success and not re-throw the exception.
            }
            catch (Exception ex)
            {
                // Log other, unexpected exceptions
                // For example: _logger.LogError(ex, "An unexpected error occurred during logout.");
                throw; // Re-throw the original, unexpected exception
            }

        }

        public async Task<AuthResponse> ConfirmEmailAsync(ConfirmEmailRequest request)
        {
            var secretHash = ComputeSecretHash(_clientId, _clientSecret, request.Email);

            var confirmSignUpRequest = new ConfirmSignUpRequest
            {
                ClientId = _clientId,
                SecretHash = secretHash, // Required if the app client has a secret
                Username = request.Email,
                ConfirmationCode = request.ConfirmationCode
            };

            try
            {
                await _cognitoClient.ConfirmSignUpAsync(confirmSignUpRequest);

                // Attempt to automatically log in the user by generating tokens
                // NOTE: ADMIN_NO_SRP_AUTH typically requires USERNAME and PASSWORD.
                // Using it without PASSWORD might only work in specific Cognito configurations
                // or custom flows. A PostConfirmation Lambda trigger is the more common
                // way to achieve token generation immediately after confirmation.
                // This attempt might fail in a standard Cognito setup.
                var adminInitiateAuthRequest = new AdminInitiateAuthRequest
                {
                    UserPoolId = _userPoolId,
                    ClientId = _clientId,
                    AuthFlow = AuthFlowType.ADMIN_NO_SRP_AUTH,
                    AuthParameters = new Dictionary<string, string>
                    {
                        { "USERNAME", request.Email },
                        { "PASSWORD", request.Password }, 
                        { "SECRET_HASH", secretHash }
                    }
                };

                try
                {
                    var cognitoAuthResponse = await _cognitoClient.AdminInitiateAuthAsync(adminInitiateAuthRequest);
                    // Successfully authenticated and received tokens
                    return new AuthResponse
                    {
                        IdToken = cognitoAuthResponse.AuthenticationResult.IdToken,
                        AccessToken = cognitoAuthResponse.AuthenticationResult.AccessToken,
                        RefreshToken = cognitoAuthResponse.AuthenticationResult.RefreshToken,
                        ExpiresIn = cognitoAuthResponse.AuthenticationResult.ExpiresIn,
                        TokenType = cognitoAuthResponse.AuthenticationResult.TokenType ?? "Bearer"
                    };
                }
                catch (NotAuthorizedException ex)
                {
                    // This exception is likely if ADMIN_NO_SRP_AUTH requires a password or other parameters are missing/incorrect.
                    // This means automatic login failed.
                    throw new Exception($"Email confirmed, but automatic login failed. User may need to log in manually. Cognito error: {ex.Message}", ex);
                }
                catch (UserNotFoundException ex)
                {
                     throw new Exception($"Email confirmed, but user not found for automatic login. Cognito error: {ex.Message}", ex);
                }
                // Catch other relevant Cognito exceptions as needed
            }
            catch (ExpiredCodeException ex)
            {
                throw new Exception($"Email confirmation failed: The confirmation code has expired. {ex.Message}", ex);
            }
            catch (CodeMismatchException ex)
            {
                throw new Exception($"Email confirmation failed: Invalid confirmation code. {ex.Message}", ex);
            }
            catch (TooManyRequestsException ex)
            {
                throw new Exception($"Too many requests for email confirmation. Please try again later. {ex.Message}", ex);
            }
            catch (Exception ex) // General catch for ConfirmSignUpAsync or other unexpected errors
            {
                // Log the exception
                throw new Exception($"An error occurred during email confirmation or token generation: {ex.Message}", ex);
            }
        }
    }
}
