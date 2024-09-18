//this will contain all our request to the API, we are centralizing all the API request in that file, insuring the connection to the API.
import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay : number) => {
    return new Promise((resolve) => { //resolve means that we will  resolve this promise in the future asynchronesly ,
        setTimeout(resolve, delay)
    }) 
}


axios.defaults.baseURL = 'http://localhost:5000/api/activities'  ;//this is a base url so  that for every request it uses this particular url to search inside
// getting response back from the API,
axios.interceptors.response.use(async response => { //interceptor is like breakpoints, with async is more beaitiful
    try {
        await sleep(1000); //wait to sleep for 1000 ms
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})


const responseBody =<T> (response : AxiosResponse<T>) => response.data ; //this responsebody holds the response of data, this is the stuff that we are intersted in.

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
    create:(activity : Activity) => requests.post<void>(`/activities` , activity ), //we are sending this activity to the port 5000, 
    update :(activity : Activity) => requests.put<void>( `/activities/${activity.id}`, activity), //we are editing the activity with the SPECIFIC ID by replacing it by our activity paraneter
    delete: (id : string) =>requests.del<void>(`/activities/${id}`),
}
const agent = {
        Activities
    }
    
   export default agent; // exporting it to use our list of activities in other files.


   
