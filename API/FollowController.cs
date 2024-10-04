
using API.Controllers;
using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API
{
    public class FollowController : BaseApiController
    {  
        [HttpPost("{username}")] // this the route username of the user that we want to follow
        // this is our route parameter.
        public async Task<IActionResult> Follow(string username)  //this is the usrname that we get from our route
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command{TargetUsername = username})); //setting up our target that we want to follow
        }

        [HttpGet("{username}")]

        public async Task<IActionResult> GetFollowings (string username , string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query{Username = username ,
            Predicate = predicate})) ;
        }
 



        
    }
}