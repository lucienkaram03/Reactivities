
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendence
    {
        public class Command  : IRequest<Result<Unit>>
        {
            public Guid Id {get ; set ;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
               var activity =await _context.Activities
               .Include(a => a.Attendes) .ThenInclude(u => u.AppUser)
               .SingleOrDefaultAsync(x => x.Id == request.Id) ; //to esnure there is no duplicates id

               if (activity ==null) return null ;

               var user = await _context.Users.FirstOrDefaultAsync( x => x.UserName  == _userAccessor.GetUsername()); //trying to getting the user name fisrt

               if(user == null) return null ;

               var HostUsername = activity.Attendes.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;
              var attendance = activity.Attendes.FirstOrDefault(x => x.AppUser.UserName == user.UserName  ) ; //getting the attendence status for this particular user, it comes before the host name

            if(attendance != null && HostUsername == user.UserName) //really the host
            activity.IsCancelled = ! activity.IsCancelled;

             if(attendance != null && HostUsername != user.UserName) //normal attendee
             activity.Attendes.Remove(attendance) ;

             if(attendance == null)
             {
                attendance = new ActivityAttendee  //creating a normal attendacne
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = false
                };

                activity.Attendes.Add(attendance); //to save it in the database not the memory
             }

             var result = await _context.SaveChangesAsync() >0;

             return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("problem updating our activity");



            }
        }
    }
}