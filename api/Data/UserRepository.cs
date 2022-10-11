﻿
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Runtime.CompilerServices;
using System.Collections;

namespace api.Data
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(DbContext context) : base(context)
        {

        }
    }
}
