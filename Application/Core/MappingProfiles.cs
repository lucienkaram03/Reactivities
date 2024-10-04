//instead of mapping each property wich the updated version of it , we will simplify code with doing them all

using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null ;
            CreateMap<Activity, Activity>();
             CreateMap<Activity, ActivityDto>()
             .ForMember(d => d.HostUsername , o =>o.MapFrom(s => s.Attendes
             .FirstOrDefault(x => x.IsHost).AppUser.UserName )); //going here very deeply to get our host and mapping it as we want in this lesson
              
            CreateMap<ActivityAttendee , AttendeeDto>() //mapping every entity of our profile, ,mapping from activiry attendee to activity dto
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username , o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio , o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(d => d.Image , 
            
            o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url)) 
            .ForMember(d => d.FollowingCount , o => o.MapFrom(s => s.AppUser.Followings.Count)) //mapping the numb of followers to the real number of followers present for the app.
            .ForMember(d => d.Image , o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url)) 
            .ForMember(d => d.Following ,
             o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)))  ;
            CreateMap<AppUser , Profiles.Profile>()
            .ForMember(d => d.FollowersCount , o => o.MapFrom(s => s.Followers.Count)) //followers and following from appuser not profile
            .ForMember(d => d.FollowingCount , o => o.MapFrom(s => s.Followings.Count)) //mapping the numb of followers to the real number of followers present for the app.
            .ForMember(d => d.Image , o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url)) 
            .ForMember(d => d.Following ,
             o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)))  ;
            CreateMap<Comment , CommentDto>()  
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username , o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.Image , o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url)) ;

            


             


        }
    }
}