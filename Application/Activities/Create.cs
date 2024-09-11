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
         public Activity Activity{ get; set; } //this is the activty created that we will send to the handler, this is what we want to receive from our API, it lie in the command block as it is the main part of the command
        }
        public class Handler : IRequestHandler<Command> //Handler class is the class that perform an operation related to Activities in a database.
        {
        private readonly DataContext _context;
            public Handler(DataContext context ) 
            {
            _context = context; //This means that the Handler class now has access to the database through _context, and it can use this to interact with the database.
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity); //this line of code add an activity to the memory(Activities Table), we ddidnt touch the DB (we are just adding on it,)so we don't need to use the asynchronous version of Add, we are adding it inside our DB context so no need to delve and search in the DB
                await _context.SaveChangesAsync();//savimg changes
                
            }

           
        }
    }
}