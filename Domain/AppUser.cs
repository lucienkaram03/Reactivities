// this is our user class
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName{get ; set;}
        public string Bio {get;set;} //adding additionalproperties that we want and that we don't inherit from Identity user


    }
}