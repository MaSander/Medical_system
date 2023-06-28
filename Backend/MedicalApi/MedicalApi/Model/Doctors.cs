using System.ComponentModel.DataAnnotations;
using MedicalApi.Data;

namespace MedicalApi.Model
{
    public class Doctors
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Crm { get; set; }
    }
}
