// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Services\AuthService.cs
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Amazon.Extensions.CognitoAuthentication;
using AppLibrary.Interfaces;
using AppLibrary.Models.Account;
using Microsoft.Extensions.Configuration;

namespace DepNails.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAmazonCognitoIdentityProvider _cognitoClient;
        private readonly CognitoUserPool _userPool;
        private readonly string _clientId;
        private readonly string _userPoolId;

        public AuthService(IAmazonCognitoIdentityProvider cognitoClient, IConfiguration configuration)
        {
            _cognitoClient = cognitoClient;
            _userPoolId = configuration["AWS:Cognito:UserPoolId"];
            _clientId = configuration["AWS:Cognito:AppClientId"];
            _userPool = new CognitoUserPool(_userPoolId, _clientId, _cognitoClient);
        }

        public async Task<AuthResponse> SignUpAsync(AccountSignUpRequest request)
        {
            var signUpRequest = new SignUpRequest 
            {
                ClientId = _clientId,
                Username = request.Username,
                Password = request.Password,
                UserAttributes = new List<AttributeType>
                {
                    new AttributeType { Name = "email", Value = request.Email }
                }
            };

            await _cognitoClient.SignUpAsync(signUpRequest);

            // Optionally, you might want to automatically confirm the user or handle confirmation separately
            // For simplicity, this example assumes the user is confirmed automatically or via another process

            // After sign-up, you could automatically log the user in, or require them to log in separately
            // Here we proceed to log them in to get tokens
            return await LoginAsync(new LoginRequest { Username = request.Username, Password = request.Password });
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = new CognitoUser(request.Username, _clientId, _userPool, _cognitoClient);
            var authRequest = new InitiateSrpAuthRequest
            {
                Password = request.Password
            };

            AuthFlowResponse authResponse = await user.StartWithSrpAuthAsync(authRequest).ConfigureAwait(false);

            return new AuthResponse
            {
                IdToken = authResponse.AuthenticationResult.IdToken,
                AccessToken = authResponse.AuthenticationResult.AccessToken,
                RefreshToken = authResponse.AuthenticationResult.RefreshToken,
                ExpiresIn = authResponse.AuthenticationResult.ExpiresIn,
                TokenType = authResponse.AuthenticationResult.TokenType
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
