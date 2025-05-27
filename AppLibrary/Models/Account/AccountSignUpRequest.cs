namespace AppLibrary.Models.Account
{
    public class AccountSignUpRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? PhoneNumber { get; set; } // Added
        public string? Name { get; set; } // Added
    }
}
