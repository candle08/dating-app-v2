using System.Net.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Diagnostics;
using System.Text.Json.Nodes;
using System.Text.Json;
using Models;
using System.Data.Common;
using static Helper.Utility;


namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]

    public class LoginController : ControllerBase
    {

        private readonly UserRepository _userRepo;
        public LoginController(IUserRepository userRepo) => _userRepo = (UserRepository?)userRepo;
        public record LoginRequest(string Username, string Password);

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var tempUser = new
            {
                token = "123",
                user = new
                {
                    firstname = "bob",
                    lastname = "zhang",
                    email = "bob.zhang@gmail.com",
                    password = "a",
                }
            };
            var pwdCorrect = await _userRepo.VerifyUserAsync(req.username, req.password);

            if (!pwdCorrect)
            {
                return NotFound(new { Message = "Password was incorrect" });
            }

            var user = await _userRepo.FetchUserAsync(req.username);

            string token = "0"; // generateJWT();

            return Ok(new { user, token });
        }

        public record SignupRequest(string Username, string Password, string firstname, string lastname, string email);

        [HttpPost("signup")]


        public async Task<IActionResult> Signup([FromBody] SignupRequest req)
        {
            try
            {
                var user = await _userRepo.AddUserAsync(username, password, firstname, lastname, email);
                string token = "0"; // Helper.Utility.generateJWT();
                return Ok(token);
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine("failed to add user, ", jsonEx);
                return Ok();
            }

        }


    }
}