
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
[ApiController] // we write a kittle less code very good
[Route("api/[controller]")] // this is the actual name of the controller.
    public class BaseApiController: ControllerBase // we put mediator in the base class to use it in all our other controllers.
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>(); //protected means it can be use in any derived class 
    } // we are giving our mediator the http request and geting srerive from it 
}