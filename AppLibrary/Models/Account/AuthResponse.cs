// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Models\DTOs\AuthResponse.cs
namespace DepNails.Server.Models.DTOs
{
    public class AuthResponse
    {
        public string IdToken { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public int? ExpiresIn { get; set; }
        public string TokenType { get; set; } = "Bearer";
    }
}
