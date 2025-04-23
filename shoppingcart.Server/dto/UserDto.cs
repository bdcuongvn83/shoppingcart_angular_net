using System.ComponentModel.DataAnnotations;

namespace shoppingcart.Server.dto
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }


        public string Role { get; set; } // "User" hoặc "Admin"
    }
}
