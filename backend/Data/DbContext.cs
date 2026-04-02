using Microsoft.EntityFrameworkCore;
namespace AppDb;

class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    //public DbSet<User> Models.Users { get; set; }
}