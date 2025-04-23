using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using shoppingcart.Server.dto;
using shoppingcart.Server.models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace shoppingcart.Server.Services
{
    public class AuthService

    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        public AuthService(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;
        }
        public async Task<User> Register(UserDto userDto)
        {
            var findUser = await UserExists(userDto.Username);
            if (findUser != null)
                return findUser;
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            var user = new User
            {
                Username = userDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)),
                PasswordSalt = hmac.Key,
                Role = userDto.Role!=null ? userDto.Role : "User"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private async Task<User> UserExists(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Username == username.ToLower());

            //throw new NotImplementedException();
        }

        public string GenerateToken(User user)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["JwtSettings:SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_config["JwtSettings:ExpiresInMinutes"])),
                Issuer = _config["JwtSettings:Issuer"],
                Audience = _config["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
