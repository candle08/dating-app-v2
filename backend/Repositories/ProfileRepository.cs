using Microsoft.EntityFrameworkCore;
using Models;
using AppDb;

public class ProfileRepository : IProfileRepository
{
    private readonly AppDbContext _context;
    public ProfileRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<UserProfile?> GetByUserIdAsync(int userId)
    {
        return await _context.UserProfile.FirstOrDefaultAsync(p => p.userId == userId);
    }

    public async Task<UserProfile> UpsertAsync(UserProfile profile)
    {
        var existing = await _context.UserProfile.FirstOrDefaultAsync(p => p.userId == profile.userId);

        if (existing is null)
        {
            await _context.UserProfile.AddAsync(profile);
            await _context.SaveChangesAsync();
            return profile;
        }

        existing.preferredFirstname = profile.preferredFirstname;
        existing.img = profile.img;
        existing.age = profile.age;
        existing.ageLowerBound = profile.ageLowerBound;
        existing.ageUpperBound = profile.ageUpperBound;
        existing.maxDistance = profile.maxDistance;
        existing.typeRelationship = profile.typeRelationship;
        existing.kids = profile.kids;
        existing.humor = profile.humor;
        existing.shows = profile.shows;
        existing.books = profile.books;
        existing.hobbies = profile.hobbies;
        existing.funNight = profile.funNight;
        existing.petPeeve = profile.petPeeve;

        await _context.SaveChangesAsync();
        return existing;
    }
}
