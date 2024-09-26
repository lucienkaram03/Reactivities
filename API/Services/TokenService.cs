using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config )
        {
            _config = config;
            
        }
        public string CreateToken(AppUser user) { //our token contain a list of claim that describe the user.

            var claims = new List<Claim>{

                new Claim(ClaimTypes.Name , user.UserName) , //we created a claim for this user name, this claim is just the name of the claim
                new Claim(ClaimTypes.NameIdentifier , user.Id) ,
                new Claim(ClaimTypes.Email , user.Email) ,

            } ;//token simply used to autenticate to our API

          
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes(_config["TokenKey"])) ;   //the same key is used for encryption and decription because it is symetric
         // this security key is used to create a token for the users, the token is signed using this symmetric security key 
        var creds = new SigningCredentials(key , SecurityAlgorithms.HmacSha256Signature); // we are signing the key using this algorithm 
        //our token have to be signed using the key, so we will sign our key
        var tokenDescriptor = new SecurityTokenDescriptor { //we are saving our token descriptor, 
            
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
           
            };
            var tokenHandler = new JwtSecurityTokenHandler() ; //a handler to handle our token
            var token =tokenHandler.CreateToken(tokenDescriptor) ;  //creating the token using the token handler and respecting the design of tokendescriotur
            return tokenHandler.WriteToken(token);
            // this is how we create a jwt handler

        





        }
       
    }
}