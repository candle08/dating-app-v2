
using System.Data;
using System.Text.Json;
using Models;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    public UserRepository(AppDbContext context)
    {
        _context = context;
    } // constructor for loginrepository class

    public async Task<bool> VerifyUserAsync(string username, string password)
    {
        var response = await _context.User
        .Where(record => record.username == username)
        .Select(record => new { record.password })
        .ConfigureAwait(false);

        if (response.password != password)
        {
            return false;
        }
    }

    public async Task<User> FetchUserAsync(string username)
    {
        try
        {
            var response = await _context.User
        .Where(record => record.username == username)
        .Select(record => new { record.firstname, record.lastname, record.email, record.id });

            return response;
        }
        catch (JsonException jsonEx)
        {
            return ("Failed to retrieve user ", jsonEx);
        }

    }

    public async Task<User> AddUserAsync(string username, string password, string firstname, string lastname, string email)
    {
        try
        {
            var newUser = new User
            {
                id = createNewId(),
                username = username,
                firstname = firstname,
                email = email,
                password = password,
            };

            await _context.User.AddAsync(newUser).ConfigureAwait(false);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return newUser;

        }
        catch (JsonException jsonEx)
        {
            return ("Failed to add user to DB: ", jsonEx);
        }


    }


}