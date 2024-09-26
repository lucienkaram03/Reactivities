//this is going to have the properties that we want to send back when a client has succesfully logged or registred

namespace API.DTOs
{
    public class UserDto
    { //those are properties given to the user when he log in or register
        public string DisplayName{ get; set; }
         public string Token{ get; set; }
          public string Image{ get; set; }
           public string Username{ get; set; }
    }
}