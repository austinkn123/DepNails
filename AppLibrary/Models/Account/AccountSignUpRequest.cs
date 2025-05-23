// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Models\DTOs\SignUpRequest.cs
using System.ComponentModel.DataAnnotations;

namespace DepNails.Server.Models.DTOs
{
    public class AccountSignUpRequest
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
