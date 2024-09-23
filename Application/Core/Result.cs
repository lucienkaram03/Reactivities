using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class Result<T> //T is our generic type, IT IS THE ACTIVITYY IN OUR EXAMPLE
    {
        public bool IsSuccess {get ; set;}
        public T Value {get; set;} //this value is goanna be the activity or is goanna be null

        public string Error {get; set;} // the error happened when we have a bad request

        public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value} ;//if the value is null, we goanna return notfound, if not we willgoanna return the activity

        public static Result<T> Failure(string error) => new Result<T> {IsSuccess = false, Error = error };
    }
} //Result<T> this is the result onject