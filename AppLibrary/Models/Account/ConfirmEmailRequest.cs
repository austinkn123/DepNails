namespace AppLibrary.Models.Account
{
    public class ConfirmEmailRequest
    {
        public string Email { get; set; }
        public string ConfirmationCode { get; set; }
    }
}
