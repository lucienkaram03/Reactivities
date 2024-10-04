


using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class List  //we are returning a list of profiles
    {
        public class Query : IRequest <Result<List<Profiles.Profile>>>
        {
            public string Predicate {get ; set ;} //if it is a list of followers or list of following

            public string Username {get ; set ;} //username of the user that we are intersted in.
        }

        public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context , IMapper mapper , IUserAccessor userAccessor) //contex to access to our profile
            {
            _userAccessor = userAccessor;
            _mapper = mapper;
            _context = context;


            }

            public async Task<Result<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<Profiles.Profile>() ;

                switch (request.Predicate) 
                { //one case returns the followers and the other case the following
                    case "followers" :
                    profiles = await _context.UserFollowings.Where(x => x.Target.UserName == request.Username)
                    .Select(u => u.Observer) //only interersted in followers so observer
                    .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider,
                    new {currentUsername = _userAccessor.GetUsername()}   ) //getting the username to our configuration
                    .ToListAsync() ;
                    break;

                    case "followings" :
                    profiles = await _context.UserFollowings.Where(x => x.Observer.UserName == request.Username)
                    .Select(u => u.Target) //only interersted in followers so observer
                    .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider ,
                     new {currentUsername = _userAccessor.GetUsername()}) // to now how is the user and what he is following
                    .ToListAsync() ;
                    break;
                }

                return Result<List<Profiles.Profile>>.Success(profiles) ;
            }
        }
    }
}