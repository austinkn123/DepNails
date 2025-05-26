// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Services\AuthService.cs
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Amazon.Extensions.CognitoAuthentication;
using AppLibrary.Interfaces;
using AppLibrary.Models.Account;
using AppLibrary.Models.Configuration;

namespace DepNails.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAmazonCognitoIdentityProvider _cognitoClient;
        private readonly CognitoUserPool _userPool;
        private readonly string _clientId;
        private readonly string _userPoolId;

        public AuthService(IAmazonCognitoIdentityProvider cognitoClient, ApplicationSettings appSettings)
        {
            _cognitoClient = cognitoClient;
            // Access Cognito settings directly from ApplicationSettings
            var cognitoSettings = appSettings.Cognito ?? throw new ArgumentNullException(nameof(appSettings.Cognito));
            _userPoolId = cognitoSettings.UserPoolId ?? throw new ArgumentNullException(nameof(cognitoSettings.UserPoolId));
            _clientId = cognitoSettings.AppClientId ?? throw new ArgumentNullException(nameof(cognitoSettings.AppClientId));
            _userPool = new CognitoUserPool(_userPoolId, _clientId, _cognitoClient);
        }

        public async Task<AuthResponse> SignUpAsync(AccountSignUpRequest request)
        {
            try
            {
                var signUpRequest = new SignUpRequest
                {
                    ClientId = _clientId,
                    Username = request.Email, // Changed from request.Username to request.Email
                    Password = request.Password,
                    UserAttributes = new List<AttributeType>
                {
                    new AttributeType { Name = "email", Value = request.Email }
                }
                };

                await _cognitoClient.SignUpAsync(signUpRequest); // No need to capture response if not used

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

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            // Ensure request.Email is not null before using it.
            var userName = request.Email ?? throw new ArgumentNullException(nameof(request.Email));
            var user = new CognitoUser(userName, _clientId, _userPool, _cognitoClient); 
            var authRequest = new InitiateSrpAuthRequest
            {
                Password = request.Password
            };

            AuthFlowResponse authResponse = await user.StartWithSrpAuthAsync(authRequest).ConfigureAwait(false);

            return new AuthResponse
            {
                IdToken = authResponse.AuthenticationResult?.IdToken,
                AccessToken = authResponse.AuthenticationResult?.AccessToken,
                RefreshToken = authResponse.AuthenticationResult?.RefreshToken,
                ExpiresIn = authResponse.AuthenticationResult?.ExpiresIn,
                TokenType = authResponse.AuthenticationResult?.TokenType ?? "Bearer"
            };
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
