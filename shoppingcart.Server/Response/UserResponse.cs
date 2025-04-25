using System.ComponentModel.DataAnnotations;
using shoppingcart.Server.models;

namespace shoppingcart.Server.dto
{
    public class UserResponse
    {
        public UserResponse(User user)
        {
            Id = user.Id;
            Username = user.Username;
            Role = user.Role;
        }

        public int Id { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }


        public string Role { get; set; } // "User" hoặc "Admin"
        
    }
}
