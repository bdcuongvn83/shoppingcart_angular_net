﻿namespace shoppingcart.Server.Requests
{
    public class LoginRequest

    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; } // "User" hoặc "Admin" 
          

    }
}
