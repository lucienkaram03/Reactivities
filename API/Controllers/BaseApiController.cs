
using API.Extensions;
using Application.Core;
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
     // we are giving our mediator the http request and geting srerive from it 


    protected ActionResult HandleResult<T>(Result<T> result) { //we are getting our results from this method
    if (result == null) return NotFound() ;
    if(result.IsSuccess && result.Value != null)
return Ok(result.Value);
if(result.IsSuccess && result.Value == null)
return NotFound();
return BadRequest(result.Error); //nt success.

    }
protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result) { //we are getting our results from this method for paged lists ths tome
    if (result == null) return NotFound() ;
    if(result.IsSuccess && result.Value != null)
    {
        Response.AddPaginationHeader(result.Value.CurrentPage , result.Value.PageSize , result.Value.TotalCount , result.Value.TotalPages) ; //in order 
        return Ok(result.Value);
    }

if(result.IsSuccess && result.Value == null)
return NotFound();
return BadRequest(result.Error); //nt success.


    }
}
}