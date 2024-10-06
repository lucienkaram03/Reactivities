// this class will goanna return a list of activities, then we will talk about query not commanddd

using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;

using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<Result<PagedList<ActivityDto>>> {


            public ActivityParams Params {get ; set ; }  //our query that hold a list o f actvity have now a page number and a page size



        } // <List<Activity> is what we are returning from the query. the {} are used if there is extra parameter to send to the query like an ID or something else.
         //IRequest<TResponse> Here it returns a response of type List Activity.
         
        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>> // class for the query handler wich is taking a query as an argument and returning the list of activities as object response to that query.
        { //This block of code allows the CustomerService class to work with the database.
          //this handler took the query request to process it and then returning the list of activity.
            private readonly DataContext _context; // Application depends on persistence, this is why it is obligatory to created a DataContext object from persistence to delve into the DB, _context will be used to access and manipulate the database.
           //readonly element is used only to assign this element to a desired value, used typically in the constructor.
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper , IUserAccessor userAccessor){ //through Data contex, we can interact with Activities Property to performe various database operation
            _userAccessor = userAccessor;
            _mapper = mapper;
            // all the Handler instance created by this constrcutor will need a DataContext instance in parameter do they can connect to the DB.
                _context = context; //This means that the Handler class now has access to the database through _context, and it can use this to interact with the database.
            }//
            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellation ) //what the handle method or function is returning a LIST of activities and it take a query request as an argument.
            // to return this list of activities, we have to get it from the database, so we are going to inject DB context here to delve into the DB, so we create the constructor from header class
            {//return await _context.Activities.ToListAsync(); //then we are returning the data that we are looking for the list of activities 
                // this task method wait for tolistAsync to fetch the desired data and then continue its task
               // know we are not doing any error handling, we will fix tha.
               
               var query =_context.Activities //getting the list of activities as a query and making it as querable to build all the rules related to pagination, this will be the source of the create async method
               .Where(d => d.Date >= request.Params.StartDate) //because we want only the future activites
               .OrderBy(d=> d.Date)
               //.Include(a => a.Attendes) //making our attendes of eachc activity present when returning our list
               //.ThenInclude(u => u.AppUser) //including the app user
               //instead of this type of query, we will use the projection which is more efficent
              

               .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider ,
                new {currentUsername = _userAccessor.GetUsername()})
               .AsQueryable() ;

            //    var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities); //we are mapping list of activity Dto to activities that is already in our code
            //    return Result<PagedList<ActivityDto>>.Success (activities); //we are returning by success our mapped object

            if(request.Params.isGoing && !request.Params.isHost) 
            {
             query = query.Where(x => x.Attendees.Any(a => a.Username == _userAccessor.GetUsername())) ; 
 //we want to return the activities where the user is going
            }    

             if(request.Params.isHost && !request.Params.isGoing) 
            {
                query = query.Where(x => x.HostUsername == _userAccessor.GetUsername()) ; 
             
 //we want to return the activities that the user is hosting
            }    
//user accessor is the one looping over the activities to enusre if the user is hosting or is going






            return Result<PagedList<ActivityDto>>.Success ( //returning our new page list

                await PagedList<ActivityDto>.CreatePagedListASync(query  , request.Params.pageNumber , request.Params.PageSize  ) // a new instance of the page list class

            );
               
                }
// now we are returning a list of paged activities
            
        }
        } 
    }
