using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IRatingRepository _ratingRepo;
        public DashboardController(IRatingRepository ratingRepo) => _ratingRepo = ratingRepo;

        [HttpGet("ratings")]
        public async Task<IActionResult> GetRatings([FromQuery] int userId)
        {
            var ratings = await _ratingRepo.GetRatingsGivenAsync(userId);
            return Ok(ratings);
        }

        [HttpGet("matches")]
        public async Task<IActionResult> GetMatches([FromQuery] int userId)
        {
            var matches = await _ratingRepo.GetMatchesAsync(userId);
            return Ok(matches);
        }
    }
}
