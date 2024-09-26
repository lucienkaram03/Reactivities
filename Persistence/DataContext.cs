using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Persistence
{
    public class DataContext:IdentityDbContext<AppUser> //DataContext is the Class that let us connect to the DataBase.
    {
        public DataContext(DbContextOptions options) :base(options){ //giving the data base option to an element

        }
        public DbSet<Activity> Activities { get; set; }  //this one is used to create tables in our data base, give name for it and filling it retreiving it 
            // this one if from the domain activity 
            //this is all our data entities that we are seeing in the Postman.
            //DbSet is a table of activity.
            //Actvities is our Table of Data Base, where each row correponds to an instance of the Activity class in domain , get to  retreive it and set to use it.
    }
}