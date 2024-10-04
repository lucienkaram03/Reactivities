
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
           public string TargetUsername {get; set ; } //what the user is attending to follow
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context , IUserAccessor userAccessor ) //we are updating the db
            {
            _userAccessor = userAccessor;
            _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users.FirstOrDefaultAsync(x => 
                x.UserName == request.TargetUsername) ; //getting the follower

                var target = await _context.Users.FirstOrDefaultAsync(x => 
                x.UserName == request.TargetUsername) ; //getting the target to follow.

                if(target == null) return null ;

                var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id); // the joint entity now, the relationship btween the observer and the target

                if(following == null) 
                { //implement the joint relationship.creating a new one

                following = new UserFollowing 
                {
                    Observer = observer ,
                    Target = target ,
                };

                _context.UserFollowings.Add(following) ;

                }

                else {

                    _context.UserFollowings.Remove(following) ;

                }

                var success = await _context.SaveChangesAsync() > 0 ;

                if(success ) return Result<Unit>.Success(Unit.Value) ;

                return Result<Unit>.Failure("Failed to update followimg") ;



            }
        }
    }
}