using System.Net;
using API.Extensions;
using API.Middleware;
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
// *important ya luc
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPlicy");


app.UseAuthentication(); //becomes before autorization, because we want to verify if the user is valid.
app.UseAuthorization();

app.MapControllers();

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
