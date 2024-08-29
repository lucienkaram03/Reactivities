using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController] // we write a kittle less code very good // VERY IMP USE of Attributres
[Route("[controller]")] // this is the actual name of the controller. 
public class WeatherForecastController : ControllerBase // controller base is our base class that weatherforcast controller is heriting from it. 
{
    private static readonly string[] Summaries = new[]  // this one is for the different temperatures that are returned from the controller
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
