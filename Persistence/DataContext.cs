using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Persistence
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options) :base(options){

        }
        public DbSet<Activity> Activities { get; set; }  //this one is used to create tables in our data base, give name for it and filling it 
            // this one if from the domain activity 
    }
}