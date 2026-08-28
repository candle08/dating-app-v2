using System.Net.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Diagnostics;
using Models;
namespace api.Controllers
{
    [Route("api")]
    [ApiController]

    public class SwipingController : ControllerBase
    {
        [HttpGet("getProfile")]
        public async Task<IActionResult> GetProfile()
        {
            Profile profile = new Profile { firstName = "bob", img = "url" };
            var temp = "hi";
            Console.WriteLine("profile first name: ");
            return Ok(profile);
        }

    }
}
