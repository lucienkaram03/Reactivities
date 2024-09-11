
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command :IRequest {
            public Activity Activity{ get; set; } //this the activity that we want to edit, we get this activity updated from our DataBase
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context ,IMapper mapper) //every instance now of the class handler will have an automapper as an argument, that we have to assign it to the real context.
            {
            _mapper = mapper;
            _context = context;//This means that the Handler class now has access to the database through _context, and it can use this to interact with the database.
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {// wait for the FindAsync task to be completed and then continue handle.
              var activity = await _context.Activities.FindAsync(request.Activity.Id); //this line of code fetch from the dataBase thhe activity that we want to update using find asynchronous.
              _mapper.Map(request.Activity, activity);// taking reuest.activity and making it inside our activity which is our main activity in the database, also this automapper will be add as a service
              // activity.Title = request.Activity.Title ?? activity.Title; //we are updating this single property for an activity. request.Activity.Title is the new value, we are going from one object to the another
               //upword this is the one that we wanna save in the database.
            }
        }
    }
}