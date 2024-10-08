
using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api[controller]")]
        public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _config;

        private readonly HttpClient _httpClient ;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService , IConfiguration config) //ctro when creating an account controller,it is given a user manager by default
        {
            _config = config;
            _tokenService = tokenService;
            _userManager = userManager; //then we have connection to the database, where -usermanager will be used to fetch the user

            
        }

//we wanna get our user from our database when logging in, this is what really happens behind the scenes
[AllowAnonymous]
[HttpPost("login")] //endpoint to login to the application, it is url of the login
public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {

    var user = await _userManager.Users.Include(p => p.Photos) 
    .FirstOrDefaultAsync(x => x.Email == loginDto.Email); //fetching a user regardling its email with now involoving the list of photos
    
    if(user == null) return Unauthorized() ;

    var result = await _userManager.CheckPasswordAsync(user , loginDto.Password); //cheking the password of the user
  
if(result)
            {
                 return CreateUserObject(user);

            }
            else return Unauthorized(); //if the password doesnt match the one in the database.

}

        
[AllowAnonymous]
        [HttpPost("register")]

public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) { //the concept here is to not to have duplicates in the userame and the email.

    if(await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
    {
        ModelState.AddModelError("usename" , "User Name taken") ; //email as a key, email taken as the value, the error is then displayed in this format
         //we are giving the error more deeply from the API
        return ValidationProblem();
    }

     if(await _userManager.Users.AnyAsync(x => x.Email== registerDto.Email)) //we did it twice because we dont want a clear response
    {
         ModelState.AddModelError("email" , "Email taken") ; //email as a key, email taken as the value, the error is then displayed in this format
         //we are giving the error more deeply from the API
        return ValidationProblem(); //this is our final code concerning the validation error
    } 

    var user = new AppUser { //now we will register
        
       DisplayName = registerDto.DisplayName,
       Email = registerDto.Email, //email is in the identity big base class.
       UserName = registerDto.Username,
    };

//user manager used to actually create the use

var result = await _userManager.CreateAsync(user , registerDto.Password);

if(result.Succeeded){

    return new UserDto { //WE WANNA RETURN PROPERTIES GOOD BENEFITS TO THE USER
DisplayName = user.DisplayName,
Token= _tokenService.CreateToken(user),
Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url, //getting the image of the user
Username = user.UserName

    };
}
return BadRequest(result.Errors);
}

[Authorize]
[HttpGet]

public async Task<ActionResult<UserDto>> GetCurrentUser() 
{
    var user = await _userManager.Users.Include(p => p.Photos)
    .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email)); //that goigng to take the email claim from the token that is presented to the API
  //in the array of users User we are finding the fisrt email from the token wchich is the email of the Current user
  return CreateUserObject(user);

}


[AllowAnonymous]
[HttpPost("fbLogin")]

public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken) 
{
    var fbVerifyKeys= _config["Faceboo:AppId"] + "|" + _config["Facebook:AppSecret"]; // adding the app secret and app id in the config file bcz when getting the verfykeys and use them in another task we dont have to write the big codes another time

    var verifyTokenResponse = await  _httpClient .GetAsync($"debug_token?input_token{accessToken}&access_token{fbVerifyKeys}"); //this is will tell if our token is a valid one for our application after we get it from our client. 


    if(!verifyTokenResponse.IsSuccessStatusCode) return Unauthorized() ;

   var fbUrl = "me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)" ; 

   var response = await _httpClient.GetFromJsonAsync<dynamic>(fbUrl) ; //getting the infos of the user as JSON into our app user through postman

 return new UserDto() ;
}


private UserDto CreateUserObject(AppUser user) //method to create the properties of a user
        {
            return new UserDto
            { //given data to the user after he logged in.

                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user), //creating a token for our user
                Username = user.UserName
            };
        }

    }
}