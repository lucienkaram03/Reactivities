//USED IN ACTIVITIES CONTROLLER
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>>{ //instead of returning an activity , we are returning the result object from our actyivity.

            public Guid Id{ get; set; } // then we will access to this from our handler as more details.
        }
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;//This means that the Handler class now has access to the database through _context, and it can use this to interact with the database.
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                // if (activity == null) throw new Exception("Activity not found") ;
                // else return activity;
                // we did it here because we don't need to add a logic inside our API controllers, we want it in our Handlers

                return Result<Activity>.Success(activity); 
            }
        }
    }
}