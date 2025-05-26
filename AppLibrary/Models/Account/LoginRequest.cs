namespace AppLibrary.Models.Account
{
    public class LoginRequest
    {
        public string? Email { get; set; } // Changed from Username to Email and made nullable
        public string? Password { get; set; } // Made nullable
    }
}
