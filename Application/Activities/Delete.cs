using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command :IRequest {
        public Guid Id { get; set; } //ID OF THE ACTIVITY THAT WE WANT TO DELETE
        }
        

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id); //getting our activity from the DB
                _context.Remove(activity); //romoving the activity from memory.
                await _context.SaveChangesAsync();
            }
        }
    }
}