using System.Reflection.Metadata;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using api.Controllers;
using Models.User;
Microsoft.AspNet.Mvc.Controller;

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
            return Challenge(new AuthenticationProperties { RedirectUri = "/api/auth/callback" },
            GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("callback")]

        public IActionResult Callback(User newUser)
        {
            var result = HttpContext.AuthenticateAsync().Result;
            Uri redirectUri = new Uri(baseUri, "/login");
            if (!result.Succeeded) return Redirect(redirectUri);

            // check/add user to db
            var email = result.Principal.FindFirst(ClaimTypes.Email)?.Value;
            var firstName = result.Principal.FindFirst(ClaimTypes.GivenName)?.Value;
            var lastName = result.Principal.FindFirst(ClaimTypes.Surname)?.Value;

            // check they exist in db, if not, add them


            Uri dashboardUri = new Uri(baseUri, "/dashboard");
            return Redirect(dashboardUri);
        }
    }
}