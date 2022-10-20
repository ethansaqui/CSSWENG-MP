﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    // Defines a model for a User entity in the database and sets up the generated User table.
    public enum UserType
    {
        ADMIN,
        EMPLOYEE
    }

    public class User : IDBEntity<User>
    {
        [Key]
        public ulong Id { get; set; }

        [Required]
        public string Username { get; set; } = "";

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; } = "";

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; } = "";


        [Required]
        public UserType Type { get; set; } = UserType.ADMIN;


        [Required]
        [PasswordPropertyText]
        public string Password { get; set; } = "";

        public override void AssignTo(User other)
        {
            Username = other.Username;
            FirstName = other.FirstName;
            LastName = other.LastName;
            Password = other.Password;
            Type = other.Type;
        }

        
    }
}
