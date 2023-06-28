using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MedicalApi.Model
{
    public class Patients
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
