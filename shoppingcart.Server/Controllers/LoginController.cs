using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppingcart.Server.dto;
using shoppingcart.Server.models;
using shoppingcart.Server.Requests;
using shoppingcart.Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shoppingcart.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;
        public LoginController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }
       
        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<IActionResult>  Post([FromBody] Requests.LoginRequest loginRequest)
        {
            var userDto = new UserDto();
            userDto.Username = loginRequest.Username;   
            userDto.Password = loginRequest.Password;
            userDto.Role = loginRequest.Role;


            var user = await _authService.Register(userDto);
            return Created("", new { message = "Insert successful", id = user.Id });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Requests.LoginRequest loginRequest)
        {
           
            var user = await _context.Users.FirstOrDefaultAsync(item => item.Username== loginRequest.Username);
           if(user == null || !VerifyPassword(loginRequest.Password, user.PasswordHash, user.PasswordSalt))
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(new { jwt = _authService.GenerateToken(user) });

            //return Created("", new { message = "Insert successful", id = user.Id });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin-only")]
        public IActionResult GetAdminData()
        {
            return Ok("Dữ liệu chỉ cho admin");
        }

        [Authorize(Roles = "User")]
        [HttpGet("user-only")]
        public IActionResult GetUserData()
        {
            return Ok("Dữ liệu chỉ cho user");
        }
        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;

            //throw new NotImplementedException();
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
