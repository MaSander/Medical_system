﻿using System.ComponentModel.DataAnnotations;

namespace MedicalApi.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string IdTypeUserNavigation { get; set; }
    }
}
