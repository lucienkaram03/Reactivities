import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import { Activity } from "../models/activity";
export default class ActivityStore { 
   //activities: Activity[] = [] ;   //this is the list of activities that we are goanna store in our activity store, it is initiazied to an empty array
   activityRegistry = new Map<string , Activity>() ; //we are using now the mapping object, it takes as string which is the id and the activity wich is the object.
   selectedActivity : Activity | undefined = undefined ;
   editMode = false;
   loading = false;    //this is a list of observable states.
   loadingInitial = false; // this is the loading logo that we are putting in.
   // now we will apply our reduction of codes that we want to from Mobx, replacing the big amount of code concerning the states in the App.tsx code


    constructor() {
       /* makeObservable (this, { // this referes that we are talking about the property of the class above back to sem 5, 
            title : observable, // then we are making this proprty observable to MobX
            setTitle : action// bounds means that we are bounding this action to the class above, but we can just deal with arrow functions.
        })
    }*/
         makeAutoObservable(this) //it directly touches the properties ,here title is a property than automatically it is observable
     

    }
    
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) =>  //.values present all the list of activities
        Date.parse(a.date) - Date.parse(b.date)) ; // to not broke our app, we will sort our activities by their dates
    }
    get groupedActivities () { //name of our array of objects
        return Object.entries ( //array of objects
            this.activitiesByDate.reduce((activities, activity) => { //we are takimg the activities date array and we are reducing it to an object.
                // in parameter it is taking the array of activities and the actvivty in it.
                // we are doing this call back function on each element of this array.
                const date = activity.date; //this goanna be our id
               activities[date] = activities[date] ? [...activities[date] , activity] : [activity] ;//we will get the property inside activities that macthes that date, veryfing if we have a macth between this activity with this date,
               return activities ;                                                     //[activity] creating an new array with that activity.

            }, {} as {[key : string] : Activity[]}) //{} reprents that we have an object now insted of an array
        )
    }
    loadActivities = async () => { // this function loads the activties as we did in the App.tsx with the use of agent.Activities, nut now in the "store" behaviore         ,automatically bounded into the class above, we used async await because we used promises.
        this.loadingInitial = true; 
        this.loadingInitial = true ; //specifying the ptoperty of the Mobx Class
        
        try {

            const activities = await agent.Activities.list() ; //then we are getting our list of activities from our agent , this is loading activities
            runInAction(() => {


                activities.forEach(activity => {
                    this.setActivity(activity) ; // instead of writing the code to set the activity in the registry, we created a private set method to do it so
                   
                  }) //we finished feeding our empty array.
                  this.loadingInitial = false;

            })
           
         } catch (error) {
            console.log(error) ;
            runInAction(() => {
                this.loadingInitial = false;
            })
            
        }
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
        activity.date = activity.date.split('T')[0]; // we will split the text based on the T type with takimg the first part of the date [0] thats mean that we dont take the time clk imformation
        //this.activities.push(activity); // here we are mutating our states in Mobx, we had an empty array initially in the class, and then we are pushing activities inside it
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

createActivity = async (activity: Activity) => {
    this.loading = true ;
    activity.id = uuid(); //same as before.
    try {
        await agent.Activities.create(activity) ; 
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

updateActivity = async(activity  :Activity) => {
    this.loading = true; // that means that we let the load of the activity happens

    try {

        await agent.Activities.update(activity); //here activity is the one updated version of the activity that we want to edit 
        runInAction(() =>{ 
            this.activityRegistry.set(activity.id , activity) ; // we are fetching the activity that we want to udpdate, the spread operate creates a new array and add the old array in it but where we have the updated version of that activity selected in it
           this.selectedActivity = activity; 
           this.editMode = false;
           this.loading= false;



        }  )

        
    } catch (error) {
        console.log(error) ; 
        runInAction(() => {
            this.loading = false; 
        })
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
   }
       
    }
}