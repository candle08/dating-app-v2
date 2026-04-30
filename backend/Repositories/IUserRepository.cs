using Models;
public interface IUserRepository
{
    Task<bool> VerifyUserAsync(string username, string password);
    Task<User> FetchUserAsync(string username);
    Task<bool> AddUserAsync(string username, string password, string firstname, string lastname, string email);


}