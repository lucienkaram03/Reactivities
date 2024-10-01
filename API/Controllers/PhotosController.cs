
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost] //to add a photo

        public async Task<IActionResult> Add ([FromForm] Add.Command command) { //it mentions where to store our photo

            return HandleResult(await Mediator.Send(command)) ;
        }
    

    [HttpDelete("{id}")] //to delete a photo

    public async Task<IActionResult> Delete (string id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command{Id = id})) ; //deleting the activity via our comtroller
    }


[HttpPost("{id}/SetMain")]

public async Task<IActionResult> SetMain (string id) 
{
    return HandleResult(await Mediator.Send(new SetMain.Command{Id = id})) ;

}






}
}