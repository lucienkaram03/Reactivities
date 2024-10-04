//USED IN ACTIVITIES CONTROLLER
//class to select a certain activity, we used now the projection query and the activityDto type that is our last solution of the combination of the two entities
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<ActivityDto>>{ //instead of returning an activity , we are returning the result object from our actyivity.

            public Guid Id{ get; set; } // then we will access to this from our handler as more details.
        }
        public class Handler : IRequestHandler<Query, Result<ActivityDto>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper , IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _mapper = mapper;
            _context = context;//This means that the Handler class now has access to the database through _context, and it can use this to interact with the database.
            }

            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider , new {currentUsername = _userAccessor.GetUsername()})
                .FirstOrDefaultAsync(x=>x.Id == request.Id); //projection of a query to GET a certain activity.
                // if (activity == null) throw new Exception("Activity not found") ;
                // else return activity;
                // we did it here because we don't need to add a logic inside our API controllers, we want it in our Handlers

                return Result<ActivityDto>.Success(activity); 
            }
        }
    }
}