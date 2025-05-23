// Filepath: c:\Users\Austin\Projects\DepNails\AppLibrary\Interfaces\IAuthService.cs
using DepNails.Server.Models.DTOs;
using System.Threading.Tasks;

namespace AppLibrary.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> SignUpAsync(AccountSignUpRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task LogoutAsync(LogoutRequest request);
    }
}
