using Models;

public interface IRatingRepository
{
    Task<SwipeCard?> GetNextProfileAsync(int userId);
    Task RateAsync(int raterId, int rateeId, int value);
    Task<List<RatedUserView>> GetRatingsGivenAsync(int userId);
    Task<List<MatchView>> GetMatchesAsync(int userId);
}
