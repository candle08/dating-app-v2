using Microsoft.EntityFrameworkCore;
namespace AppDb;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Models.Users { get; set; }
}