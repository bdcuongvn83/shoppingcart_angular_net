using Microsoft.EntityFrameworkCore;
using shoppingcart.Server.models;
using System.Collections.Generic;

namespace shoppingcart.Server
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<FileEntity> FileEntity { get; set; }
    }
}
