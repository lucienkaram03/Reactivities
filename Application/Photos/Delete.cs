using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete  
    {
        public class Command : IRequest<Result<Unit>> //we are not returning am id or a url
        {
            public string Id {get ; set ;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext , IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _photoAccessor = photoAccessor;
            _context = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos) //this is the  photo collection of the user that  we are interersted in 
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername()) ; //getting the user that wanna store theb photo 

                  if(user == null) return null;

                  var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id) ; //getting the actiivty that we want to delete

                  if (photo == null) return null ;

                  if(photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo") ;

                  var result= await _photoAccessor.DeletePhoto(photo.Id) ; //deleting the photo from cloudianry

                  if(result == null) return Result<Unit>.Failure("problem deleting photo from cloudinary") ;

                  user.Photos.Remove(photo);
                  
                  var success = await _context.SaveChangesAsync() >0;

                  if(success) return Result<Unit>.Success(Unit.Value);

                  return Result<Unit>.Failure("problem deleting photo from API") ;



            }
        }








    }
}