using System.Net;
using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// *important ya luc

builder.Services.AddControllers( opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();  //this one is to build our policy.
    opt.Filters.Add(new AuthorizeFilter(policy));
}    );
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();


// security code
app.UseXContentTypeOptions() ; 
app.UseReferrerPolicy(opt => opt.NoReferrer()) ; //allows a site to control how much information the browser includes when navigating away from our app.
app.UseXXssProtection(opt => opt.EnabledWithBlockMode()) ;  //this is a cross site scripting protection header, it enables block mode if there is one who attemps to hack
app.UseXfo(opt => opt.Deny()) ;          //prevents our app to be inside an iframe, this protects against click jacking 

app.UseCspReportOnly(opt => opt  //this one white source those sources of content
.BlockAllMixedContent() //only https 
//scan of the open source components
.StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com"))
.FontSources(s => s.Self().CustomSources( "https://fonts.gstatic.com" , "data:")) //make our font allowable
.FormActions(s => s.Self())
.FrameAncestors(s => s.Self())
.ImageSources(s => s.Self().CustomSources("blob:" , "https://res.cloudinary.com")) //makes the image accessible with respecting the security 
.ScriptSources(s => s.Self())

) ;
//this one is used for big attacks
//all this content are allowed to be serve what we are returning from our client folder, making them allowed and secure









// *important ya luc
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else 
{
    app.Use(async (contex , next) =>  //in production mode
    {
        contex.Response.Headers.Append("Strict-Transport-security", "max-age = 31536000") ;
        await next.Invoke() ;

    });
}


app.UseCors("CorsPlicy");


app.UseAuthentication(); //becomes before autorization, because we want to verify if the user is valid.
app.UseAuthorization();

app.UseDefaultFiles() ;
app.UseStaticFiles() ;

app.MapControllers();
app.MapHub<ChatHub>("/chat") ; //adding the root of our hub
app.MapFallbackToController("Index" , "Fallback");
using var scope = app.Services.CreateScope();// intermediaire to access a service
var services = scope.ServiceProvider;

try
{
var context = services.GetRequiredService<DataContext>();
var userManager = services.GetRequiredService<UserManager<AppUser>>(); //user manager manage users of type AppUser
await context.Database.MigrateAsync();
await Seed.SeedData(context, userManager) ;

}
catch (Exception ex)
{
var logger = services.GetRequiredService<ILogger<Program>>();
logger.LogError(ex, "An error occured during the migration");

}


app.Run();
