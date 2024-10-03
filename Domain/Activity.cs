

namespace Domain
{
    public class Activity
    {
      public Guid Id {get; set ;}

      public string Title{get;set;}

      public DateTime Date {get;set;} 

      public string Description{get;set;}

      public string Category{get;set;}

      public string City {get;set;}

      public string Venue{get;set;}

      public bool IsCancelled {get;set ;}

    public ICollection<ActivityAttendee> Attendes {get ; set;} = new List<ActivityAttendee>(); //than we dont get a null reference when we attend this in postman

    public ICollection<Comment> Comments {get ; set; } = new List<Comment>(); //comments for that specific activity

      
      


    }
}