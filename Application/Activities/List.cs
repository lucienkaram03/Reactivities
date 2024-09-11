// this class will goanna return a list of activities, then we will talk about query not commanddd
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<List<Activity>> {} // <List<Activity> is what we are returning from the query. the {} are used if there is extra parameter to send to the query like an ID or something else.
         //IRequest<TResponse> Here it returns a response of type List Activity.
         
        public class Handler : IRequestHandler<Query, List<Activity>> // class for the query handler wich is taking a query as an argument and returning the list of activities as object response to that query.
        { //This block of code allows the CustomerService class to work with the database.
          //this handler took the query request to process it and then returning the list of activity.
            private readonly DataContext _context; // Application depends on persistence, this is why it is obligatory to created a DataContext object from persistence to delve into the DB, _context will be used to access and manipulate the database.
           //readonly element is used only to assign this element to a desired value, used typically in the constructor.

            public Handler(DataContext context){ //through Data contex, we can interact with Activities Property to performe various database operation
            // all the Handler instance created by this constrcutor will need a DataContext instance in parameter do they can connect to the DB.
                _context = context; //This means that the Handler class now has access to the database through _context, and it can use this to interact with the database.
            }//
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellation) //what the handle method or function is returning a LIST of activities and it take a query request as an argument.
            // to return this list of activities, we have to get it from the database, so we are going to inject DB context here to delve into the DB, so we create the constructor from header class
            {return await _context.Activities.ToListAsync(); //then we are returning the data that we are looking for the list of activities 
                // this task method wait for tolistAsync to fetch the desired data and then continue its task

                }
            }
        } 
    }
