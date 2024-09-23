using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command :IRequest<Result<Unit>> {
        public Guid Id { get; set; } //ID OF THE ACTIVITY THAT WE WANT TO DELETE 
        //we can took the activity itself as we did in the create class but here we are learning new things.
        }
        

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;//This means that the Handler class now has access to the database through _context, and it can use this to interact with the database, connection established.
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id); //getting our activity from the DB
                if(activity == null) return null;
                _context.Remove(activity); //romoving the activity from memory.
               var result = await _context.SaveChangesAsync() >0; //SaveChangesAsync() returns an integer, 
               if (!result) return Result<Unit>.Failure("Failed to delete the activity") ; //if result = false
               else return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}