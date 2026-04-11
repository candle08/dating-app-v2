using System.Net.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Diagnostics;
using System.Text.Json.Nodes;
using System.Text.Json;
using Models;
using System.Data.Common;


namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]

    public class LoginController : ControllerBase
    {

        private readonly UserRepository _userRepo;

        [HttpPost("login")]
        public async ActionResult Login([FromBody] string username, [FromBody] string password)
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
            var pwdCorrect = await _userRepo.VerifyUserAsync(username, password);

            if (!pwdCorrect)
            {
                return NotFound(new { Message = "Password was incorrect" });
            }

            var user = await _userRepo.FetchUserAsync(username);

            string token = generateJWT();

            return Ok(token, user);
        }

        [HttpPost("signup")]

        public async ActionResult Signup([FromBody] string username, [FromBody] string password, [FromBody] string firstname, [FromBody] string lastname, [FromBody] string email)
        {
            try
            {
                var user = await _userRepo.AddUserAsync(username, password, firstname, lastname, email);
                string token = generateJWT();
                return Ok(token, user);
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine("failed to add user, ", jsonEx);
                return;
            }

        }


    }
}