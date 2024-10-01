using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>> //command here is returning something because we want the Id and the APIkey of the image
        {
            public IFormFile File { get; set; } 
        }

        public class Handler : IRequestHandler<Command, Result<Photo>> //taking a command and returning a result photo
        {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context , IPhotoAccessor photoAccessor , IUserAccessor userAccessor) //INITIALIZING FIELDS FROM PARAMETER BECAUSE we want to store photos into the database
            {
            _userAccessor = userAccessor;
            _photoAccessor = photoAccessor;
            _context = context;
                


            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos) //this is the collection we are interersted in 
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername()) ; //getting the user that wanna store theb photo 

                if(user == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File); //storing the photo into our cloudinary

                var photo = new Photo  //in a more proper way
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if(!user.Photos.Any(x => x.IsMain)) photo.IsMain = true ; //in case the user's photo collection is empty
                user.Photos.Add(photo) ;
                var result = await _context.SaveChangesAsync() >0 ;

                if(result ) return Result<Photo>.Success(photo) ; //returning the photo as the result

                return Result<Photo>.Failure("Problem adding photo") ;
                 


            }
        }
    }
}