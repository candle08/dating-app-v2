using Microsoft.EntityFrameworkCore;
namespace AppDb;

using Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext() { }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { } // ctor
    public virtual DbSet<User> User { get; set; }
    public virtual DbSet<Rating> Rating { get; set; }
    public virtual DbSet<UserProfile> UserProfile { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.username)
            .IsUnique();

        // one rating per (rater, ratee) pair - re-rating updates instead of duplicating
        modelBuilder.Entity<Rating>()
            .HasIndex(r => new { r.raterId, r.rateeId })
            .IsUnique();

        modelBuilder.Entity<UserProfile>()
            .HasIndex(p => p.userId)
            .IsUnique();
    }
}
