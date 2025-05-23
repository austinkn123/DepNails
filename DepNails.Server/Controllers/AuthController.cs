// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Controllers\AuthController.cs
using AppLibrary.Interfaces;
using AppLibrary.Models.Account;
using Microsoft.AspNetCore.Mvc;

namespace DepNails.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(AccountSignUpRequest request)
        {
            try
            {
                var result = await _authService.SignUpAsync(request);
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
    }
}
