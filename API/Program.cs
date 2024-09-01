using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// *important ya luc

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(opt => { // this is our policy
    opt.AddPolicy("CorsPlicy", policy => {
    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost: 3000");
});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// *important ya luc
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPlicy");



app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();// intermediaire to access a service
var services = scope.ServiceProvider;

try
{
var context = services.GetRequiredService<DataContext>();

}
catch (Exception ex)
{
var logger = services.GetRequiredService<ILogger<Program>>();
logger.LogError(ex, "An error occured during the migration");

}


app.Run();
