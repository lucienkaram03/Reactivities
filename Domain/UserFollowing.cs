

namespace Domain
{
    public class UserFollowing //this is our join entity 
    {
        public string ObserverId {get ; set ;}

        public AppUser Observer {get ; set ;} //, FOLLOWERS

        public string TargetId {get ; set ;} // , FOLLOWINGS

        public AppUser Target {get ; set ;} 

        //we have an observer that is following a target
    }
}