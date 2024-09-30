using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command: IRequest<Result<Unit>>{//it doesnt have any return type because a command only change not fetch data, so we have a single type of parameter
         public Activity Activity{ get; set; } //this is the activty created that we will send to the handler, this is what we want to receive from our API, it lie in the command block as it is the main part of the command
        }
//validator for activity creation
public class CommandValidator : AbstractValidator<Command> { // this validator is goanna validate the command this time

public CommandValidator() {

    RuleFor(x => x.Activity).SetValidator(new ActivityValidator()); //checking if title exist, if the user entered one.
//for the activity inside the command, call the activity validator
}

}

        public class Handler : IRequestHandler<Command, Result<Unit>> //Handler class is the class that perform an operation related to Activities in a database.
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor ) 
            {
            _userAccessor = userAccessor; 
            _context = context; //This means that the Handler class now has access to the database through _context, and it can use this to interact with the database.
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
              var user = await _context.Users.FirstOrDefaultAsync(x => 
              x.UserName == _userAccessor.GetUsername()); //this will give us access to our user object

              var attendee  = new ActivityAttendee { //fisrt atttende of our activity is the host

                AppUser = user ,
                Activity = request.Activity,
                IsHost = true
              }; 

                _context.Activities.Add(request.Activity); //this line of code add an activity to the memory(Activities Table), we ddidnt touch the DB (we are just adding on it,)so we don't need to use the asynchronous version of Add, we are adding it inside our DB context so no need to delve and search in the DB
             var result =   await _context.SaveChangesAsync() > 0;//savimg changes
             if(!result) return Result<Unit>.Failure("Failed to create activity");

             return Result<Unit>.Success(Unit.Value) ;
                
            }

           
        }
    }
}