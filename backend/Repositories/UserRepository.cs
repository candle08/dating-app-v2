using Microsoft.EntityFrameworkCore;
using Models;
using AppDb;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> VerifyUserAsync(string username, string password)
    {
        var record = await _context.User.FirstOrDefaultAsync(r => r.username == username);
        return record is not null && BCrypt.Net.BCrypt.Verify(password, record.password);
    }

    public async Task<User?> FetchUserAsync(string username)
    {
        return await _context.User
            .Where(record => record.username == username)
            .FirstOrDefaultAsync();
    }

    public async Task<User?> AddUserAsync(string username, string password, string firstname, string lastname, string email)
    {
        try
        {
            var newUser = new User
            {
                username = username,
                firstname = firstname,
                lastname = lastname,
                email = email,
                password = BCrypt.Net.BCrypt.HashPassword(password),
                createdAt = DateTime.UtcNow,
            };

            await _context.User.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }
        catch (DbUpdateException dbEx)
        {
            Console.WriteLine("Failed to add user to DB: " + dbEx.Message);
            return null;
        }
    }
}
