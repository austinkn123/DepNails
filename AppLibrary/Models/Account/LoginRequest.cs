// Filepath: c:\Users\Austin\Projects\DepNails\DepNails.Server\Models\DTOs\LoginRequest.cs
using System.ComponentModel.DataAnnotations;

namespace DepNails.Server.Models.DTOs
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
