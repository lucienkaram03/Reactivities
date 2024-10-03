// to have a clearer and better project, we just created a class detictated to application services that were located in program.cs
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
       public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)  { //creating now the extension method itself, config will let us access to our .json file and app settings
             // this method just return the services.
                services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
});
services.AddCors(opt => { // this is our policy
    opt.AddPolicy("CorsPlicy", policy => {
    policy
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials() // then we ensure connection to signalR with the token required
    .WithOrigins("http://localhost: 3000");


});
});
services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly)); //saving our mediator that we created in the List class, all of them will be registred
services.AddAutoMapper(typeof(MappingProfiles).Assembly); //assembly is used to locate all of the mapping profiles that we are using in our project.
services.AddFluentValidationAutoValidation(); //adding the auto validation
services.AddValidatorsFromAssemblyContaining<Create>();
services.AddHttpContextAccessor() ; //addimg this srvice in our API
services.AddScoped<IUserAccessor, UserAccessor>() ; //and this will make this available to be injected inside our application hankders, so we can really apply what we want and get the userName.
services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
services.AddScoped<IPhotoAccessor, PhotoAccessor>();
services.AddSignalR();
return services;
 }   
    }
}