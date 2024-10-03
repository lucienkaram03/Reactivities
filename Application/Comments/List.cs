
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query :IRequest<Result<List<CommentDto>>> //of type query bcz we are just querying the comments created and adding them to a list
        {
            public Guid ActivityId{get ; set;}

        }

        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
            public Handler(DataContext context , IUserAccessor userAccessor , IMapper mapper) //datacontex because we are updating the database by creating that list
            {
            _mapper = mapper;
            _userAccessor = userAccessor;
            _context = context;

            }

            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken) //we need to get a list of comments from a particular activity, order them knowing their dates, map them to comment dto and then create the lsit.
            {
                var comments = await _context.Comments
                .Where(x=> x.Activity.Id == request.ActivityId)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToListAsync() ;

                return Result<List<CommentDto>>.Success(comments) ;
            }
        }
    }
}