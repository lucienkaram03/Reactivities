using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper.Configuration.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    
    {
        
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        public IsHostRequirementHandler(DataContext dbContext , IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
           
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(userId == null) return Task.CompletedTask;

            var activityId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
            .SingleOrDefault(x => x.Key =="id").Value?.ToString()) ; //parsing our guid object to guid to string to be used.

            var attendee =  _dbContext.ActivityAttendees
            .AsNoTracking() //to not loss our attendee list and the host of the activity
            .SingleOrDefaultAsync(x => x.AppUserId== userId && x.ActivityId == activityId)
            .Result;
            //getting our attendee object using his two ids

            if(attendee == null) return Task.CompletedTask;

            if(attendee.IsHost) context.Succeed(requirement); //our attendee is the host and the we can edit the activity

            return Task.CompletedTask;

        }
    }
}