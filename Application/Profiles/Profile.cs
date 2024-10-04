
using System.Collections.Generic;
using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username {get ; set ;}

        public string DisplayName{ get; set; }

        public string Image{ get; set; }

        public string Bio{ get; set; }

        public ICollection<Photo> Photos {get ; set ;}

        public bool Following {get ; set ;} // to now if the current logged in user when they return a current user profile is following this particular user profile

        public int FollowersCount {get ; set ; }

        public int FollowingCount {get ; set ;}

    }
}