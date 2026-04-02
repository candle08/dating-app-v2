using System.Net.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;


namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        // public const Uri baseUri = Environment.GetEnvironmentVariable("FRONTEND_URL");

        [HttpGet("login")]
        public IActionResult Login()
        {
            Console.WriteLine("Login");
            return Ok();
        }

        [HttpGet("signup")]

        public IActionResult Signup()
        {
            return Ok();

        }


    }
}