using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor; //to access the service, we need our httpcontextaccessor , we need to access the http comgtext
         public UserAccessor(IHttpContextAccessor httpContextAccessor) //we want to access our http context using this interface because our http context contains our user obejct, and from our user objects we can get access to the claims inside the token
         {
            _httpContextAccessor = httpContextAccessor;
            
         }
        public string GetUsername()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name) ; //intersedted in the username instead of the adress
        }
    }
}