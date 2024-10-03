

using System.Drawing;
using Application.Comments;
using AutoMapper.Execution;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub //instead of API controllers.
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

       

        public async Task SendComment(Create.Command command) //we are sending from the server to the client
        {
            var comment = await _mediator.Send(command);//at this point, everthing is automatically did, saved to the DB, and mapped

            //now we want send the comment to various type of client

             await Clients.Group(command.ActivityId.ToString()) //sending this comment to all the CONNECTED clients. HERE it is sended to the group of that activity
            .SendAsync("ReceiveComment", comment.Value); //the method name on the client side and the value of the comment bcz comment is a result object.
            
        }

//
public override async Task OnConnectedAsync() //every user that receives a comment and is connected to signalR will be added to a group
{
    var httpContext =Context.GetHttpContext() ;
    var activityId = httpContext.Request.Query["activityId"]; //we are getting the key of the activityId
    await Groups.AddToGroupAsync(Context.ConnectionId , activityId) ;
    var result = await _mediator.Send(new List.Query{ActivityId = Guid.Parse(activityId)}) ; //we are sending the list of comments to the client of that particular grp
    await Clients.Caller.SendAsync("LoadComments" , result.Value); //sending comments to the caller and storing it in the method LoadComments

}


    }
}