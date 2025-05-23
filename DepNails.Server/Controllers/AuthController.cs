// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Controllers\AuthController.cs
using AppLibrary.Interfaces;
using DepNails.Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _authService.SignUpAsync(request);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                // Log the exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _authService.LoginAsync(request);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                // Log the exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout(LogoutRequest request)
        {
             if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _authService.LogoutAsync(request);
                return Ok(new { message = "Logout successful" });
            }
            catch (System.Exception ex)
            {
                // Log the exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
