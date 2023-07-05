using Microsoft.EntityFrameworkCore;

namespace MedicalApi.Data
{
    public class MedicalAPIContext : DbContext
    {
        public MedicalAPIContext (DbContextOptions<MedicalAPIContext> options)
            : base(options)
        {
        }

        public DbSet<MedicalApi.Model.User>? User { get; set; }
        public DbSet<MedicalApi.Model.Doctors>? Doctors { get; set; }
        public DbSet<MedicalApi.Model.Patients>? Patients { get; set; }
        public DbSet<MedicalApi.Model.Medications>? Medications { get; set; }
    }
}
