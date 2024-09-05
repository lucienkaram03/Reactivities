using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command: IRequest{//it doesnt have any return type because a command only change not fetch data, so we have a single type of parameter
           public Activity Activity{ get; set; } //this is the activty created that we will send to the handler, this is what we want to receive from our API
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context ) 
            {
            _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity); //this line of code add an activity to the memory, we ddidnt touch the DB so we don't need to use the asynchronous version of Add, we are adding it inside our context
                await _context.SaveChangesAsync();//savimg changes
                
            }

           
        }
    }
}