using Microsoft.EntityFrameworkCore;
namespace AppDb;

using Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext();
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { } // ctor
    public virtual DbSet<User> Users { get; set; }

}