using clinic_app.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace clinic_app.data
{
    public class clinicDBcontext : DbContext
    {
        public clinicDBcontext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<reguser> regusers { get; set; }
        

        public bool TrustServerCertificate { get; set; }
    }

}
