// this class will goanna return a list of activities.
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
        public class Query: IRequest<List<Activity>> {} // <List<Activity> is what we are returning from the query. the place we are goanna retrieve our query , the {} are used if there is extra parameter to send to the query like an ID or something else.
         
         
        public class Handler : IRequestHandler<Query, List<Activity>> // class for the query handler wich is taking a query as an argument and returning the list of activities as object response to that query.
        { //we need a constructor to access our data contex.
            private readonly DataContext _context;
        

            public Handler(DataContext context){
            
                _context = context;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellation) //what the handle method or function is returning a task of activities and it take a query request as an argument.
            // to return this list of activities, we have to get it from the database, so we are going to inject DB context here, so we create the constructor from header class
            {return await _context.Activities.ToListAsync(); //then we are returning the data that we are looking for the list of activities 
                

                }
            }
        }// 
    }
