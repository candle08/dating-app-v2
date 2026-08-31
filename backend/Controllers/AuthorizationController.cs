using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Models;
using static Helper.Utility;

namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        public LoginController(IUserRepository userRepo) => _userRepo = userRepo;

        public record LoginRequest(string username, string password);
        public record SignupRequest(string username, string password, string firstname, string lastname, string email);

        private static object ToSafeUser(User user) => new
        {
            id = user.id,
            username = user.username,
            firstname = user.firstname,
            lastname = user.lastname,
            email = user.email,
        };

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var pwdCorrect = await _userRepo.VerifyUserAsync(req.username, req.password);

            if (!pwdCorrect)
            {
                return NotFound(new { Message = "Username or password was incorrect" });
            }

            var user = await _userRepo.FetchUserAsync(req.username);
            if (user is null)
            {
                return NotFound(new { Message = "Username or password was incorrect" });
            }

            string token = "0"; // generateJWT();

            return Ok(new { user = ToSafeUser(user), token });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest req)
        {
            var existing = await _userRepo.FetchUserAsync(req.username);
            if (existing is not null)
            {
                return Conflict(new { Message = "Username is already taken" });
            }

            var user = await _userRepo.AddUserAsync(req.username, req.password, req.firstname, req.lastname, req.email);
            if (user is null)
            {
                return StatusCode(500, new { Message = "Failed to create user" });
            }

            string token = generateJWT(); // generateJWT();

            return Ok(new { user = ToSafeUser(user), token });
        }
    }
}
