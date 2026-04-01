using System.Reflection.Metadata;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using api.Controllers;
using Models.User;
Microsoft.AspNetCore.Mvc;
Microsoft.AspNetCore.Authentication;
Microsoft.AspNetCore.Authentication.Google;

namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        public static const Uri baseUri = Environment.GetEnvironmentVariable("FRONTEND_URL");

        [HttpGet("login")]
        public IActionResult Login()
        {
            
        }

        [HttpGet("signup")]

        public IActionResult Signup()
        {
            
        }


    }
}