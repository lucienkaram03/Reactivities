using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config) {

            services.AddIdentityCore<AppUser> (opt => //we are adding services to our APP user identity, more stuffs to the entity , this adds the default identity system for the specified user and role types.
            {
            opt.Password.RequireNonAlphanumeric = false; //this is condition that we are adding to our password, we can add as much as we want
            opt.User.RequireUniqueEmail = true;
         } )
         .AddEntityFrameworkStores<DataContext>(); // it allow us to query our users in the Entity Framework Store our ou DB.


var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes(config["TokenKey"])) ; 
         services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme). 
         AddJwtBearer(opt =>
       {
         opt.TokenValidationParameters = new TokenValidationParameters // USED TO VALIDATE OUR TOKEN
         {

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience= false,




         };
         } );
         services.AddScoped<TokenService>(); //specifying that the token is scoped only in case of an http request

         return services;
        }
    }
}