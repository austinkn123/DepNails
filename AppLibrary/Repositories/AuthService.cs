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
                // Log the exception here  
                Console.WriteLine($"Exception occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                throw;
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

            try
            {
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
                Console.WriteLine($"Exception occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                throw; // Re-throw the exception to inform caller of authentication failure
            }
        }

        public async Task LogoutAsync(LogoutRequest request)
        {
            var globalSignOutRequest = new GlobalSignOutRequest
            {
                AccessToken = request.AccessToken
            };
            await _cognitoClient.GlobalSignOutAsync(globalSignOutRequest);
        }

    }
}
