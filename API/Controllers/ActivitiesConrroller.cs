

using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{ 
    public class ActivitiesConrroller : BaseApiController
    { // we want first to queury our database before writing the http endpoints.so use fhe dependency injection to inject our data context inside api class 
        private readonly DataContext _context;
        public ActivitiesConrroller(DataContext context)
        {
            _context = context;
            
        }
        // creation of endpoints
        [HttpGet] //api/activities someone how goanna use this route will reach this endpoint
        // now specifying whats going inside the response body 
        public  async Task<ActionResult<List<Activity>>> GetActivities()
        { // the response to the http request is nor then a list from activity 
          return await _context.Activities.ToListAsync(); // we returned from the database instance that navigate into the database the list of activities needed and mentionned by the route.
        }
        // accesing the data requested to the API by id primary key this time
        [HttpGet("{id}")] //api/activities/ certain Id
        public  async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id); // specifiing that we want the activity with that id that was requested****
        }
    }
}