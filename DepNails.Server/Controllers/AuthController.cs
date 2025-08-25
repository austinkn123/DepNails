// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Controllers\AuthController.cs
using AppLibrary.Interfaces;
using AppLibrary.Models;
using AppLibrary.Models.Account;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IClientsRepository _clientsRepository;

        public AuthController(IAuthService authService, IClientsRepository clientsRepository)
        {
            _authService = authService;
            _clientsRepository = clientsRepository;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(AccountSignUpRequest request)
        {
            try
            {
                var result = await _authService.SignUpAsync(request);

                if (result.UserSub != null)
                {
                    _clientsRepository.AddClient(new Client
                    {
                        Email = request.Email,
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        Phone = request.PhoneNumber,
                        CognitoUserId = Guid.Parse(result.UserSub),
                        CreatedAt = DateTime.UtcNow
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            try
            {
                var result = await _authService.LoginAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout(LogoutRequest request)
        {
            try
            {
                await _authService.LogoutAsync(request);
                return Ok(new { message = "Logout successful" });
            }
            catch (Exception ex)
            {
                // Log the exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailRequest request)
        {
            try
            {
                var authResponse = await _authService.ConfirmEmailAsync(request);
                // If ConfirmEmailAsync successfully returns an AuthResponse (with tokens),
                // the user is effectively logged in.
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                // Log the exception details for server-side diagnostics
                // For example: _logger.LogError(ex, "Error during email confirmation for {Email}", request.Email);
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                // Get the Authorization header
                var authHeader = Request.Headers["Authorization"].FirstOrDefault();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(new { message = "Authorization header is missing or invalid" });
                }

                // Extract the ID token (assuming it's sent as the bearer token)
                var idToken = authHeader.Substring("Bearer ".Length).Trim();
                
                var userProfile = await _authService.GetUserProfileAsync(idToken);
                Client? client = null;
                if (userProfile != null && !string.IsNullOrEmpty(userProfile.Sub))
                {
                    if (Guid.TryParse(userProfile.Sub, out var userGuid))
                    {
                        client = _clientsRepository.GetClientByCognitoUserId(userGuid);
                        userProfile.ClientId = client?.Id;
                    }
                }

                return Ok(userProfile);
            }
            catch (Exception ex)
            {
                // Log the exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
