
namespace Repository;
namespace Models.User;
public class UserRepository : IUserRepository
{
    private readonly DbContext _context;
    public UserRepository(DbContext context)
    {
        _context = context;
    } // constructor for loginrepository class

    public async Task<User> SignUp(User user)
    {
        
    }

    public async Task<User> LoginAsync(User user)
    {
        
    }


}