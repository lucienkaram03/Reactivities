//USED IN ACTIVITIES CONTROLLER
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>{

            public Guid Id{ get; set; } // then we will access to this from our handler as more details.
        }
        public class Handler : IRequestHandler<Query, Activity>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;//This means that the Handler class now has access to the database through _context, and it can use this to interact with the database.
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}