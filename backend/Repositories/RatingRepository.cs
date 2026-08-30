using Microsoft.EntityFrameworkCore;
using Models;
using AppDb;

public class RatingRepository : IRatingRepository
{
    private readonly AppDbContext _context;
    public RatingRepository(AppDbContext context)
    {
        _context = context;
    }

    // next user this person hasn't rated yet (and isn't themselves)
    public async Task<SwipeCard?> GetNextProfileAsync(int userId)
    {
        var alreadyRated = _context.Rating
            .Where(r => r.raterId == userId)
            .Select(r => r.rateeId);

        var candidate = await _context.User
            .Where(u => u.id != userId && !alreadyRated.Contains(u.id))
            .OrderBy(u => u.id)
            .FirstOrDefaultAsync();

        if (candidate is null)
        {
            return null;
        }

        // profile is optional, a user may not have filled one out yet
        var profile = await _context.UserProfile.FirstOrDefaultAsync(p => p.userId == candidate.id);

        return new SwipeCard
        {
            userId = candidate.id,
            firstName = !string.IsNullOrEmpty(profile?.preferredFirstname)
                ? profile!.preferredFirstname!
                : candidate.firstname,
            img = profile?.img ?? "",
        };
    }

    public async Task RateAsync(int raterId, int rateeId, int value)
    {
        var existing = await _context.Rating
            .FirstOrDefaultAsync(r => r.raterId == raterId && r.rateeId == rateeId);

        if (existing is not null)
        {
            existing.value = value;
            existing.createdAt = DateTime.UtcNow;
        }
        else
        {
            await _context.Rating.AddAsync(new Rating
            {
                raterId = raterId,
                rateeId = rateeId,
                value = value,
                createdAt = DateTime.UtcNow,
            });
        }

        await _context.SaveChangesAsync();
    }

    public async Task<List<RatedUserView>> GetRatingsGivenAsync(int userId)
    {
        return await _context.Rating
            .Where(r => r.raterId == userId)
            .Join(_context.User,
                  r => r.rateeId,
                  u => u.id,
                  (r, u) => new RatedUserView
                  {
                      userId = u.id,
                      firstname = u.firstname,
                      lastname = u.lastname,
                      value = r.value,
                      createdAt = r.createdAt,
                  })
            .OrderByDescending(v => v.createdAt)
            .ToListAsync();
    }

    // a match is a reciprocal pair: I rated them X, they rated me the same X
    public async Task<List<MatchView>> GetMatchesAsync(int userId)
    {
        var mine = _context.Rating.Where(r => r.raterId == userId);

        return await mine
            .Join(_context.Rating,
                mine => new { other = mine.rateeId, me = userId, mine.value },
                theirs => new { other = theirs.raterId, me = theirs.rateeId, theirs.value },
                (mine, theirs) => theirs.raterId)
            .Join(_context.User,
                  otherId => otherId,
                  u => u.id,
                  (otherId, u) => new { otherId, u })
            .Join(_context.Rating.Where(r => r.raterId == userId),
                  x => x.otherId,
                  r => r.rateeId,
                  (x, r) => new MatchView
                  {
                      userId = x.u.id,
                      firstname = x.u.firstname,
                      lastname = x.u.lastname,
                      value = r.value,
                  })
            .ToListAsync();
    }
}
