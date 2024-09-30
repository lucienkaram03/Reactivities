
//insuring the dependency between the application and the infrastructuret to  access the serivice from our application project
namespace Application.Interfaces
{
    public interface IUserAccessor //to let the app access the service, it is used insede the app project
    {
        string GetUsername() ;
    }
}