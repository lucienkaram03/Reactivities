import { format } from "date-fns";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { Profile } from "../models/profile";
import { store } from "./store";
import { Pagination, PagingParams } from "../models/pagination";
;
export default class ActivityStore { 
   //activities: Activity[] = [] ;   //this is the list of activities that we are goanna store in our activity store, it is initiazied to an empty array
   activityRegistry = new Map<string , Activity>() ; //we are using now the mapping object, it takes as string which is the id and the activity wich is the object.
   selectedActivity : Activity | undefined = undefined ;
   editMode = false;
   loading = false;    //this is a list of observable states.
   loadingInitial = true; // this is the loading logo that we are putting in.
   pagination : Pagination | null = null ;
   pagingParams = new PagingParams() ;
   predicate = new Map().set('all ', true) //all our activities are setted to be filteres, to see which filter is selected by default
   // now we will apply our reduction of codes that we want to from Mobx, replacing the big amount of code concerning the states in the App.tsx code



    constructor() {
       /* makeObservable (this, { // this referes that we are talking about the property of the class above back to sem 5, 
            title : observable, // then we are making this proprty observable to MobX
            setTitle : action// bounds means that we are bounding this action to the class above, but we can just deal with arrow functions.
        })
    }*/
         makeAutoObservable(this); //it directly touches the properties ,here title is a property than automatically it is observable
     
         reaction(
            () => this.predicate.keys() , //when filtering wanna change all the things related to paging, so reaction will take care of this
            () => { //all the paging params will change
                this.pagingParams = new PagingParams() ;
                this.activityRegistry.clear() ;
                this.loadActivities() ;
            }






         )

    }

    setPagingParams = (pagingParams : PagingParams) =>  {
        this.pagingParams= pagingParams ;
    }

    setPredicate = (predicate : string , value : string | Date) => { //setting the type of our filter

        const resetPredicate = () => { //this method switch up the keys filters apar the date, if we are hosting filter than we reset is going and vice versa
            this.predicate.forEach((value, key)  => {
                if(key !== 'StartDate') this.predicate.delete(key) ;
            })
        }

        switch (predicate) { //4 types of filter
            case 'all' :
                resetPredicate() ;
                this.predicate.set('all' , true) ;
                break;

                case 'isGoing' :
                    resetPredicate() ;
                    this.predicate.set('isGoing' , true) ;
                    break;
                    
                 case 'isHost' :
                        resetPredicate() ;
                        this.predicate.set('isHost' , true) ;
                        break;   

                 case 'StartDate' :
                            this.predicate.delete('StartDate')
                            this.predicate.set('StartDate' , value) ; //the value represent the date which we are filter for
                            



        }

    }



    get axiosParams() {
        const params = new URLSearchParams() ;
        params.append('pageNumber' , this.pagingParams.pageNumber.toString()) ;
        params.append('pageSize' , this.pagingParams.pageSize.toString()) ;
        this.predicate.forEach((value , key) => {

            if(key === 'StartDate') { //if we have a date filter

                params.append(key , (value as Date).toISOString())

            } else { //we have a normal filter
                params.append(key , value) ;
            }
            return params;


        }
        
    )
    }




    
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) =>  //.values present all the list of activities
        a.date!.getTime() - b.date!.getTime()) ; // to not broke our app, we will sort our activities by their dates
    }
    get groupedActivities () { //name of our array of objects
        return Object.entries ( //array of objects
            this.activitiesByDate.reduce((activities, activity) => { //we are takimg the activities date array and we are reducing it to an object.
                // in parameter it is taking the array of activities and the actvivty in it.
                // we are doing this call back function on each element of this array.
                const date = format (activity.date! , 'dd MM yyy h:mm aa') //we want the activity name so we use the Tostring to let it be
               activities[date] = activities[date] ? [...activities[date] , activity] : [activity] ;//we will get the property inside activities that macthes that date, veryfing if we have a macth between this activity with this date,
               return activities ;                                                     //[activity] creating an new array with that activity.

            }, {} as {[key : string] : Activity[]}) //{} reprents that we have an object now insted of an array
        )
    }
    loadActivities = async () => { // this function loads the activties as we did in the App.tsx with the use of agent.Activities, nut now in the "store" behaviore         ,automatically bounded into the class above, we used async await because we used promises.
       
        this.loadingInitial = true ; //specifying the ptoperty of the Mobx Class
        
        try {

            const result = await agent.Activities.list(params) ; //then we are getting our list of activities from our agent , this is loading activities
                result.data.forEach(result.data => { 
                    this:this.setActivity(result.data) , // instead of writing the code to set the activity in the registry, we created a private set method to do it so
                   
                  }) //we finished feeding our empty array.

                  this.setPagination(result.)
                  this.loadingInitial = false;

            
           
         } catch (error) {
            console.log(error) ;
            runInAction(() => {
                this.loadingInitial = false;
            })
            
        }
    }

    setPagination = (pagination : Pagination) => {
        this.pagination = pagination ; 
    }

    loadActivity = async (id : string) => { //method used to load a single activity from the API when it comes to selecting it

        let activity =this.getActivity(id) ;
        if(activity) {
            this.selectedActivity = activity;
            return activity;
        }

        else {
            this.loadingInitial = true; 
            try {
                activity=  await agent.Activities.details(id) ; //fetched this activity from our API, know we want to add it to our registry, so we will create a setActivity method to do it so
                this.setActivity(activity) ; 
                runInAction( ()  => this.selectedActivity = activity)  ; //putting the activity in the registry after we get it from our API
                 // WE have to assign the selected activity to it, it will insure succes wen refreshing the page .
                return activity;
               this.loadingInitial =false;

            } catch (error) {
                console.log(error) ;
                this.loadingInitial = false;
                
            }

        }
    }  

    private getActivity = (id : string) => {
        return this.activityRegistry.get(id) ; // we are getting an activity from our registry, if it is not found we go to our API
         
    }
    private setActivity =(activity : Activity) => { 
        const user = store.userStore.user;
if(user){
    activity.isGoing = activity.attendees!.some( //checking if the user is going to an event as in they are in the attlist
        a => a.username === user.username
    )
    activity.isHost =activity.hostUsername === user.username;
    activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
}




        //activity.date = activity.date.split('T')[0]; // we will split the text based on the T type with takimg the first part of the date [0] thats mean that we dont take the time clk imformation
        //this.activities.push(activity); // here we are mutating our states in Mobx, we had an empty array initially in the class, and then we are pushing activities inside it
        activity.date = new Date(activity.date!); // new Date we are giving the type javascript to the date, this is what we want also
        this.activityRegistry.set(activity.id , activity) ;
    }

    // selectActivity = (id: string) => { //this is the action related to update the observable state selectedactivity
    //     this.selectedActivity = this.activityRegistry.get(id); //find the activity hold in a such as the id of the activity is equal to the id passed in parametr
    // }
    // cancelSelectActivity = () => { //action to cancel the observable select activity 
    //     this.selectedActivity = undefined ;
    // }

    // openForm= (id? : string ) => { // this is the method to open a form, we will use the same logic did in the previous section of crud operations between editing and creating an activity.
    //     if(id) {
    //         this.selectedActivity = undefined ; 
    //     }
    //     else this.cancelSelectActivity() ;
    //     this.editMode = true;
    // }
    // closeForm = () =>{
    //     this.editMode=false ;
    // }
    //know we will create the functions related to create and updating an activity, removing them from App.tsx and focusing on them on the store function

createActivity = async (activity: Activity) => { //when creating this activity, we goanna add our user as an attendee to that activity, and is goanna be the host of this activity
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    activity.id = uuid(); //same as before.
    try {
        await agent.Activities.create(activity) ; 
        const newActivity = new Activity(activity);
        newActivity.hostUsername = user!.username;
        newActivity.attendees = [attendee] ;
        this.setActivity(newActivity);
        runInAction(() => {
            this.selectedActivity = newActivity;
        })
        runInAction(() => {  // we want the update of all the observable properties to happens at the same time in one single update.
            this.activityRegistry.set(activity.id, activity) ;
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error) {
        console.log(error) ; //in case of a failure response this is handle inside here.
        runInAction(() => {
            this.loading = false;
        })
    }
}

updateActivity = async(activity  :ActivityFormValues) => {
   // this.loading = true; // that means that we let the load of the activity happens

    try {

        await agent.Activities.update(activity); //here activity is the one updated version of the activity that we want to edit 
        runInAction(() =>{ 
            if (activity.id) {
                const updatedActivity = {...this.getActivity(activity.id), ...activity}
                this.activityRegistry.set(activity.id , updatedActivity as Activity) ;// we are fetching the activity that we want to udpdate, the spread operate creates a new array and add the old array in it but where we have the updated version of that activity selected in it
                this.selectedActivity = updatedActivity as Activity; 
            }

            
           
        



        }  )

        
    } catch (error) {
        console.log(error) ; 
       
    }
}  

deleteActivity = async( id : string)=> {
 this.loading = true;
   try {
          await agent.Activities.delete(id);
          runInAction(() => {
            //this.activities = [...this.activities.filter(a => a.id !== id )] ;
            this.activityRegistry.delete(id);
           // if(this.selectedActivity?.id === id) this.cancelSelectActivity(); //this one is for canceling the card on the RHS when deleting the activity, we used selecetedActivity because when it appeas on the RHS, it is selected.
            this.loading = false;
            
          })
        
    
   } catch (error) {
    console.log(error) ;
    runInAction( () => {
        this.loading=false;}
    )
   } }

updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
        await agent.Activities.attend(this.selectedActivity!.id);
        runInAction(() => {
            if(this.selectedActivity?.isGoing){
                this.selectedActivity.attendees = 
                this.selectedActivity.attendees?.filter(a => a.username !== user?.username); //getting the login user from the attendee array
                this.selectedActivity.isGoing = false;
            }else{
                const attendee = new Profile(user!) ; // creating a new attendee
                this.selectedActivity?.attendees?.push(attendee); //adding the new attendee to the list 
                this.selectedActivity!.isGoing= true;
            }

            this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
        })
    } catch (error) {
        console.log(error)
    } finally{
        runInAction( () => this.loading = false);
    }
   }
       
cancelActivityToggle = async() => {

    this.loading = true ;
    try{
        await agent.Activities.attend(this.selectedActivity!.id); //give the list of attendees for this selected activity.
        runInAction(() => {
            this.selectedActivity!. isCancelled = !this.selectedActivity?.isCancelled;
            this.activityRegistry.set(this.selectedActivity!.id , this.selectedActivity!);
        })
    }
    catch(error) {

        console.log(error) ;

    } finally {
        runInAction(() => this.loading = false) ;
    }
}

clearSelectedActivity = () => {
    this.selectedActivity = undefined ; //when going from an activity to another in the front end, there is some dirty things from the previous activity, we want to remove them
}


//method to update the attendees in each activity that we have inside our registry 
updateAttendeeFollowing = (username : string ) => {
    this.activityRegistry.forEach(activity => {
        activity.attendees?.forEach(attendee => {
            if (attendee.username == username) { //the attendee that we want to follow
                if(attendee.following) {

                 attendee.followersCount -- ;
                }
                 else attendee.followersCount ++ ; 

                attendee.following = !attendee.following ; // to update the following flag, if we already follow than we unfollow and vice versa

            }
        })
    })
}


    }
