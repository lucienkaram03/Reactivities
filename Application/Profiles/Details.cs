using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{ 
    public class Details  //we know want to change to profile object.
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string Username {get ; set ; } 
        }

        public class Handler : IRequestHandler<Query, Result<Profile>> //our result is of  type profilen
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context , IMapper mapper , IUserAccessor userAccessor) //we will mapp our user object to our profile object, thus will have to use the automapper
            {
            _userAccessor = userAccessor;
            _mapper = mapper;
            _context = context;

            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users 
                .ProjectTo<Profile>(_mapper.ConfigurationProvider , new {currentUsername = _userAccessor.GetUsername()}) // getting our user as a profile object this time.
                .SingleOrDefaultAsync(x => x.Username == request.Username) ;
                
                if(user == null) return null;

                return Result<Profile>.Success(user) ;
            }
        }
    }
}