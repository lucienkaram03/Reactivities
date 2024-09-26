
// since we updated our application, we should know updated the API
using System.Reflection.Metadata;
using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{ 
    public class ActivitiesController : BaseApiController
    { // we want first to queury our database before writing the http endpoints.so use fhe dependency injection to inject our data context inside api class 
       
       
        //public ActivitiesConrroller(IMediator mediator) //USING mediator to apply our architechture using this connectionn
        //{
           // _mediator = mediator;
            
            
       // } we took out our mediator constructor because we did stuff in our database.
        // creation of endpoints
        [HttpGet] //api/activities someone how goanna use this route will reach this endpoint
        // now specifying whats going inside the response body 
        public  async Task<IActionResult> GetActivities() //task returns a list of activities.
        { // the response to the http request is nor then a list from activity 
         // return await Mediator.Send(new List.Query()) ;


         return HandleResult( await Mediator.Send(new List.Query()) ) ; //know we are carrying about the errorhandling


        } //our API controller is sending a request via our go between mediator to our application project, then we are returning the list to the API via also this mediator, all in one
        //The Mediator.Send() method sends a request to the application's business logic. In this case, it's sending a query to retrieve the list of activities by invoking List.Query().
//List.Query is likely a class that represents the request to get all the activities from the database.
        // accesing the data requested to the API by id primary key this time




        [HttpGet("{id}")] //api/activities/ certain Id
        public  async Task<IActionResult> GetActivity(Guid id) //IAction results we are returning hhtp responses
        {
            var result = await Mediator.Send(new Details.Query{Id = id}); // specifiing that we want the activity with that id that was requested****
            // the mediator used have to be saved in the program class main
 // Id = id we are calling the set method of the property ID and changing its value by the one given as parameter
        /// if(activity == null) return NotFound(); //becasue null will give a 204 response

  //else return activity;

return HandleResult(result); //
}


        [HttpPost] //used to create resources
        public async Task<IActionResult> CreateActivity(Activity activity)
         { // activity is the activity created.
         return HandleResult(await Mediator.Send(new Create.Command {Activity=activity})); //This Mediator.Send() send a requests to the application buisness logic, in this case it is sending a command to add an activity to the list of activities.
           
        }




        [HttpPut("{id}")] //used to edit resources
        public async Task<ActionResult> EditActivity(Guid id, Activity activity){ //in parameter here, activity is the new one that we want to update.

          activity.Id = id; //we are updatimg the id of activity in case there was not an Id
          return HandleResult(await Mediator.Send(new Edit.Command{Activity=activity})) ;// sending a request to the handler to edit the activity entity.
          

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
          return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));// this Mediator.send() sends a requets to the application buonssme logic (comminacation between the api and apllication),this request is a command to delete an activity
          
        }
        }
        
    } 