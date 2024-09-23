using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity> { // this validator is goanna validate an activity.

public ActivityValidator() {

    RuleFor(x => x.Title).NotEmpty(); //checking if title exist, if the user entered one.
    RuleFor(x => x.Description).NotEmpty(); 
    RuleFor(x => x.Date).NotEmpty(); 
    RuleFor(x => x.Venue).NotEmpty(); 
    RuleFor(x => x.Category).NotEmpty(); 

}

}
    
}