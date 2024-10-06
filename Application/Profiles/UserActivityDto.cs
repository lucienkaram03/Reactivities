
using System.Text.Json.Serialization;


namespace Application.Profiles
{
    public class UserActivityDto // this class returns only the important properties that we want when filtering the events. for ex we don't need comments , chats or something else 
    { //this the format that we will use in challenge section 21, enough information
        public Guid Id {get ; set ;}

        public string Title {get ; set ;}

        public string Category {get ; set ; }

        public DateTime Date {get ; set ; }

        [JsonIgnore] // to not really show this to the client  

        public string HostUsername {get ; set ; }
    }
}