using System.Net.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Diagnostics;
using System.Text.Json.Nodes;
using System.Text.Json;


namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]

    public class LoginController : ControllerBase
    {

        [HttpPost("login")]
        public ActionResult Login()
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

            return Ok(tempUser);
        }

        [HttpPost("signup")]

        public ActionResult Signup()
        {
            return Ok();

        }


    }
}