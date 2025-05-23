using AppLibrary.Models.Account;

namespace AppLibrary.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> SignUpAsync(AccountSignUpRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task LogoutAsync(LogoutRequest request);
    }
}
