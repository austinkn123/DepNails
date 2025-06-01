namespace AppLibrary.Models.Account
{
    public class ConfirmEmailRequest
    {
        public string Email { get; set; }
        public string ConfirmationCode { get; set; }
        public string? Password { get; set; } // Added password field, made nullable
    }
}
