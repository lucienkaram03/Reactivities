

using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly ILogger<ExceptionMiddleware> _logger;

          private readonly IHostEnvironment _env;
        private readonly RequestDelegate _next;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
        IHostEnvironment env) //requestDelefate is function that can process an HTTP Request,ILogger<ExceptionMiddleware> is used to dont let to output this information to our console.
        {
            _env = env;
            _next = next;
            _logger = logger;
            
        }
        public async Task InvokeAsync(HttpContext context){ //this is where our HTTP will be processed

        try
        {
            await _next(context);
        }
        catch (Exception ex) //trying to catch the exeption
        {
            
            _logger.LogError(ex, ex.Message); 
            context.Response.ContentType = "application/json" ; //we have to mention it because we are not in an API controller
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; 

            var response = _env.IsDevelopment() 
            ? new AppException(context.Response.StatusCode , ex.Message, ex.StackTrace? .ToString())
            : new AppException(context.Response.StatusCode , "Internal Server Error") ; //production version

            var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};//we have to mention it because we are not in an API controller

            var json = JsonSerializer.Serialize(response , options) ; //our jason response

            await context.Response.WriteAsync(json) ; //writing our jason r

        }

        }
    }
}