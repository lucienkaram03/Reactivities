
namespace Application.Core
{
    public class AppException
    {
        private string v;

        public AppException(int statusCode, string v)
        {
            StatusCode = statusCode;
            this.v = v;
        }

        public AppException(int statusCode, string message, string v)
        {
            StatusCode = statusCode;
            Message = message;
            this.v = v;
        }

        public int StatusCode {get ; set;}

        public string Message {get;set;}

        public string Details {get; set;}
    }
}