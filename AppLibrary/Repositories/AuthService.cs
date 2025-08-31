// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Services\AuthService.cs
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Amazon.Extensions.CognitoAuthentication;
using AppLibrary.Interfaces;
using AppLibrary.Models.Account;
using AppLibrary.Models.Configuration;
using System.IdentityModel.Tokens.Jwt;
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
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                throw new ArgumentException("Email and password are required.");
            }

            try
            {
                var userAttributes = new List<AttributeType>
                {
                    new AttributeType { Name = "email", Value = request.Email.Trim() }
                };

                var signUpRequest = new SignUpRequest
                {
                    ClientId = _clientId,
                    Username = request.Email.Trim(),
                    Password = request.Password,
                    UserAttributes = userAttributes,
                    SecretHash = ComputeSecretHash(_clientId, _clientSecret, request.Email.Trim())
                };

                var signUpResponse = await _cognitoClient.SignUpAsync(signUpRequest);
                var userSub = signUpResponse.UserSub;

                await _cognitoClient.AdminConfirmSignUpAsync(new AdminConfirmSignUpRequest
                {
                    UserPoolId = _userPoolId,
                    Username = request.Email.Trim()
                });

                var authRequest = new AdminInitiateAuthRequest
                {
                    UserPoolId = _userPoolId,
                    ClientId = _clientId,
                    AuthFlow = AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
                    AuthParameters = new Dictionary<string, string>
                    {
                        { "USERNAME", request.Email.Trim() },
                        { "PASSWORD", request.Password },
                        { "SECRET_HASH", ComputeSecretHash(_clientId, _clientSecret, request.Email.Trim()) }
                    }
                };

                var authResponse = await _cognitoClient.AdminInitiateAuthAsync(authRequest);
                return new AuthResponse
                {
                    IdToken = authResponse.AuthenticationResult.IdToken,
                    AccessToken = authResponse.AuthenticationResult.AccessToken,
                    RefreshToken = authResponse.AuthenticationResult.RefreshToken,
                    ExpiresIn = authResponse.AuthenticationResult.ExpiresIn,
                    TokenType = authResponse.AuthenticationResult.TokenType ?? "Bearer",
                    UserSub = userSub
                };
            }
            catch (Exception ex)
            {
                // Wrap with context for higher-level handling
                throw new Exception($"An error occurred during sign up: {ex.Message}", ex);
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
                catch (Exception)
            {
                // Log other, unexpected exceptions
                // For example: _logger.LogError(ex, "An unexpected error occurred during logout.");
                    throw; // Re-throw the original, unexpected exception
            }

        }

        //Might be used in the future
        public async Task<AuthResponse> ConfirmEmailAsync(ConfirmEmailRequest request)
        {
            var secretHash = ComputeSecretHash(_clientId, _clientSecret, request.Email);

            var confirmSignUpRequest = new ConfirmSignUpRequest
            {
                ClientId = _clientId,
                SecretHash = secretHash,
                Username = request.Email,
                ConfirmationCode = request.ConfirmationCode
            };

            try
            {
                await _cognitoClient.ConfirmSignUpAsync(confirmSignUpRequest);

                // Email confirmed successfully - return empty AuthResponse to indicate success
                // User will need to log in separately
                return new AuthResponse
                {
                    IdToken = null,
                    AccessToken = null,
                    RefreshToken = null,
                    ExpiresIn = null,
                    TokenType = "Bearer"
                };
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
            catch (Exception ex)
            {
                throw new Exception($"An error occurred during email confirmation: {ex.Message}", ex);
            }
        }

        public async Task<UserProfile> GetUserProfileAsync(string idToken)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jsonToken = tokenHandler.ReadJwtToken(idToken);

                var profile = new UserProfile();

                // Extract claims from the ID token
                foreach (var claim in jsonToken.Claims)
                {
                    switch (claim.Type)
                    {
                        case "email":
                            profile.Email = claim.Value;
                            break;
                        case "given_name":
                            profile.FirstName = claim.Value;
                            break;
                        case "family_name":
                            profile.LastName = claim.Value;
                            break;
                        case "phone_number":
                            profile.PhoneNumber = claim.Value;
                            break;
                        case "name":
                            profile.Name = claim.Value;
                            break;
                        case "sub":
                            profile.Sub = claim.Value;
                            break;
                    }
                }

                // If first/last name are not available, try to parse from the name field
                if (string.IsNullOrEmpty(profile.FirstName) && string.IsNullOrEmpty(profile.LastName) && !string.IsNullOrEmpty(profile.Name))
                {
                    var nameParts = profile.Name.Split(' ', StringSplitOptions.RemoveEmptyEntries);
                    if (nameParts.Length > 0)
                    {
                        profile.FirstName = nameParts[0];
                        if (nameParts.Length > 1)
                        {
                            profile.LastName = string.Join(" ", nameParts.Skip(1));
                        }
                    }
                }

                return await Task.FromResult(profile);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while extracting user profile: {ex.Message}", ex);
            }
        }
    }
}
