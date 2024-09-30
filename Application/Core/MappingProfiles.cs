//instead of mapping each property wich the updated version of it , we will simplify code with doing them all

using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
             CreateMap<Activity, ActivityDto>()
             .ForMember(d => d.HostUsername , o =>o.MapFrom(s => s.Attendes
             .FirstOrDefault(x => x.IsHost).AppUser.UserName )); //going here very deeply to get our host and mapping it as we want in this lesson
              
            CreateMap<ActivityAttendee , Profiles.Profile>() //mapping every entity of our profile
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username , o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio , o => o.MapFrom(s => s.AppUser.Bio));
            


             


        }
    }
}