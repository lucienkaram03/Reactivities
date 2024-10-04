//this will contain all our request to the API, we are centralizing all the API request in that file, insuring the connection to the API.
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Activity, ActivityFormValues } from '../models/activity';
import { Photo, Profile } from '../models/profile';
import { User, UserFormValues } from '../models/user';
import { router } from '../router/Routes';
import { store } from '../stores/store';


const sleep = (delay : number) => {
    return new Promise((resolve) => { //resolve means that we will  resolve this promise in the future asynchronesly ,
        setTimeout(resolve, delay)
    }) 
}


axios.defaults.baseURL = 'http://localhost:5000/api/activities'  ;//this is a base url so  that for every request it uses this particular url to search inside

const responseBody =<T> (response : AxiosResponse<T>) => response.data ; //this responsebody holds the response of data, this is the stuff that we are intersted in.
axios.interceptors.request.use(config => {
const token = store.commonStore.token;
if(token && config.headers) config.headers.Authorization = `Bearer ${token}` ;
return config;

})



// getting response back from the API,
axios.interceptors.response.use(async response => { //interceptor is like breakpoints, with async is more beaitiful
    
        await sleep(1000); //wait to sleep for 1000 ms
        return response;
    
}, (error : AxiosError) => { // we are getting back an error from our API
    const {status, data, config } = error.response as AxiosResponse ; // we are getting data and status from our response
    switch (status) { //This is the status that we get back from our response.
        case 400 :
            if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                router.navigate('/not-found') ; //what they used here wasnt a valid guid, if we have a data errors prop with the id, then we have a bad guid
            }
           if (data.errors) { //when hitting validation error. 
            const modalStateErrors = [] ; //empty array
            for (const key in data.errors) { // 
                if(data.errors[key]) {
                    modalStateErrors.push(data.errors[key]) //then we will have a single array of stings
                }
            }
            throw modalStateErrors.flat() ; // we will have tahnan array of strings for each individual error
      
           


           } else {
            toast.error(data) ; //shoqwing just the string when hiitng the bad request button
        }


            break;  
            //case 400 is a bad request
          case 401:
            toast.error('Unauthorized')
         break;
          case 403:
            toast.error('Forbidden') 
            break ;
            case 404:
               router.navigate('/not-found') //rooting our notfound file into the case were we have a not found
                break ;
                case 500:
                    store.commonStore.setServerError(data) ;
                    router.navigate('/server-error') ;
                    break;
         default:
           break;
    }

return Promise.reject(error) ; //that will pass the error back to the component that was calling the method that caused this particular error as well.



}) //what we are getting back is an error.




const requests = { // we are doing a single object for all the crud operations, it store all the request of our activities
    get: <T> (url : string) => axios.get<T>(url).then(responseBody), // getting  from axios
    put: <T> (url : string , body: object ) => axios.put<T>(url , body).then(responseBody), // the body of type object is the entity that we want to post or edit in the actvities array
    post: <T> (url : string, body: object) => axios.post<T>(url , body).then(responseBody), //
    del: <T> (url : string) => axios.delete<T>(url).then(responseBody),//getting  from axios
    
} // <T> we are specifying the type of the instance that we are fetching and getting , this is our generic type, like int 
const Activities = {
    list : () => requests.get<Activity[]>('/activities') ,//  this is a request to go and list all the activities, whatever we put in the url it goanna be our base url, and also we will goanna go into our response data.
    // we are precising what is the type of our data that we are frtchig 
    details: (id : string) => requests.get<Activity >(`/activities'/${id}`), //this one is for getting the details when we create an activity and saving it in the server, we are getting an activity with a specific ID
    create:(activity : ActivityFormValues) => requests.post<void>(`/activities` , activity ), //we are sending this activity to the port 5000, 
    update :(activity : ActivityFormValues) => requests.put<void>( `/activities/${activity.id}`, activity), //we are editing the activity with the SPECIFIC ID by replacing it by our activity paraneter
    delete: (id : string) =>requests.del<void>(`/activities/${id}`),
    attend: (id : string) => requests.post<void>(`/activities/${id}/attend`, {}) //creating the new method to make the functionality of attendees
}

const Account = { //our specific method to connect to our API concerning to login , register and get the current user

    current: () => requests.get<User>('/account'), //return type is a user
    login: (user: UserFormValues) => requests.post<User>('/account/login', user), //this method take as a parameter the values from the form, and from these values it return the user with this info from the url below.
    register: (user: UserFormValues) => requests.post<User>('/account/register', user), 


}

//create an object to get the users profile from the API
const Profiles = {
    get : (username : string ) => requests.get<Profile>(`/profiles/${username}`), //getting the profile with the user photo as well
    uploadPhoto: (file : Blob) => {
        const formData = new FormData() ;
        formData.append('File' , file) ;
        return axios.post<Photo>('photos', formData, {
            headers: {'Content-Type' : 'multipart/form-data'}
        })
    },
    setMainPhoto: (id : string) =>requests.post(`/photos/${id}/setMain` , {}),
    deletePhoto: (id : string) => requests.del(`/photos/${id}`),
    updateProfile : (profile : Partial<Profile>) => requests.put(`/profiles/` , profile),
    updateFollowing : (username : string) => requests.post(`/follow/${username}` , {}) , 
    listFollowings: (username : string , predicate : string ) => //generate a list of followings for the user profile
        requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`)
} 

const agent = {
        Activities, 
        Account,
        Profiles //insuring the connection to the API through this agent while using the methods inside activities and account
    }
    
   export default agent; // exporting it to use our list of activities in other files.


   
