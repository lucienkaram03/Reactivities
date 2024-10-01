using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  
        public class ProfilesController : BaseApiController
        {
            [HttpGet("{username}")]

            public async Task<IActionResult> GetProfile(string username)
            {
                return HandleResult(await Mediator.Send(new Details.Query{Username= username})) ;
            } //we are projecting from a profile to a user object.


        }
    
}