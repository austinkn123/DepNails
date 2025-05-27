namespace DepNails.Server.Models.Configuration
{
    public class AwsCognitoSettings
    {
        public string? UserPoolId { get; set; }
        public string? AppClientId { get; set; }
        public string? ClientSecret { get; set; } // Add this line
        public string? Region { get; set; }
        public string? Authority { get; set; }
    }
}
