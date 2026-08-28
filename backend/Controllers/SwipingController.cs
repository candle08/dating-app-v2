using Microsoft.AspNetCore.Mvc;
using Models;

namespace api.Controllers
{
    [Route("api")]
    [ApiController]
    public class SwipingController : ControllerBase
    {
        private readonly IRatingRepository _ratingRepo;
        public SwipingController(IRatingRepository ratingRepo) => _ratingRepo = ratingRepo;

        [HttpGet("getProfile")]
        public async Task<IActionResult> GetProfile([FromQuery] int userId)
        {
            var card = await _ratingRepo.GetNextProfileAsync(userId);
            if (card is null)
            {
                return Ok(null);
            }
            return Ok(card);
        }

        public record SendProfileRequest(int RaterId, int RateeId, int Value);

        [HttpPost("sendProfile")]
        public async Task<IActionResult> SendProfile([FromBody] SendProfileRequest req)
        {
            if (req.Value < 1 || req.Value > 10)
            {
                return BadRequest(new { Message = "Rating must be between 1 and 10" });
            }
            if (req.RaterId == req.RateeId)
            {
                return BadRequest(new { Message = "Cannot rate yourself" });
            }

            await _ratingRepo.RateAsync(req.RaterId, req.RateeId, req.Value);
            return Ok();
        }
    }
}
