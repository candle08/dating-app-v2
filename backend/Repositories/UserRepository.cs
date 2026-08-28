
using System.Data;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Models;
using AppDb;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    public UserRepository(AppDbContext context)
    {
        _context = context;
    } // constructor for loginrepository class

    public async Task<bool> VerifyUserAsync(string username, string password)
    {
        var record = await _context.User.FirstOrDefaultAsync(r => r.username == username);
        return record is not null && record.password == password;

    }

    public async Task<User?> FetchUserAsync(string username)
    {
        try
        {
            var response = await _context.User
        .Where(record => record.username == username)
        .FirstOrDefaultAsync()
        .ConfigureAwait(false);
            return response;

        }
        catch (JsonException jsonEx)
        {
            Console.WriteLine("Failed to retrieve user ", jsonEx);
            return null;
        }

    }

    public async Task<bool> AddUserAsync(string username, string password, string firstname, string lastname, string email)
    {
        try
        {
            var newUser = new User
            {
                // id = Helper.Utility.createNewId(),
                username = username,
                firstname = firstname,
                lastname = lastname,
                email = email,
                password = password,
            };

            await _context.User.AddAsync(newUser).ConfigureAwait(false);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return true;

        }
        catch (JsonException jsonEx)
        {
            Console.WriteLine("Failed to add user to DB: ", jsonEx);
            return false;
        }
    }


}