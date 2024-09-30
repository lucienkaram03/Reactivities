
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


        public DbSet<ActivityAttendee> ActivityAttendees {get;set;}  //creation of this joint table in the database ,we have to create it


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);    //overrinding the onmodel creating method to create an entity of type ActivityAttendee

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new {aa.AppUserId , aa.ActivityId})); //we are giving a primary key of 2 id in our table.

            builder.Entity<ActivityAttendee>()
            .HasOne(u => u.AppUser)  //building our one to many relationship btween app user and activities
            .WithMany(a => a.Activities)
            .HasForeignKey(aa => aa.AppUserId) ;

              builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)  //building our one to many relationship btween activities and app user
            .WithMany(u => u.Attendes)
            .HasForeignKey(aa => aa.ActivityId) ;

            // then we have our many to many realtionship builded


    }
}
}