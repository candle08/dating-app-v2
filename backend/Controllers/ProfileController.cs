using Microsoft.AspNetCore.Mvc;
using Models;

namespace api.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileRepository _profileRepo;
        public ProfileController(IProfileRepository profileRepo) => _profileRepo = profileRepo;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int userId)
        {
            var profile = await _profileRepo.GetByUserIdAsync(userId);
            return Ok(profile);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] UserProfile profile)
        {
            var saved = await _profileRepo.UpsertAsync(profile);
            return Ok(saved);
        }
    }
}
