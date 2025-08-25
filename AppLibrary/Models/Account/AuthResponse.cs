namespace AppLibrary.Models.Account
{
    public class AuthResponse
    {
        public string? IdToken { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public int? ExpiresIn { get; set; }
        public string TokenType { get; set; } = "Bearer";
        public string? UserSub { get; set; }
    }
}
