using Models;

public interface IProfileRepository
{
    Task<UserProfile?> GetByUserIdAsync(int userId);
    Task<UserProfile> UpsertAsync(UserProfile profile);
}
