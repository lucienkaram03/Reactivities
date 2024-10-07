
//152
import { observer } from 'mobx-react-lite';


import { Container } from 'semantic-ui-react';
//import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';
import ModalContainer from '../common/modals/modalContainer';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponents';
import NavBar from './navbar';


function App() { // this is our app component  

const location = useLocation() ; //this will give us the path of what's inside the URL, as in which route has the user gone to, then we have to check regardlimg two conditions if we will have to go the home page or the childrens
const {commonStore , userStore} = useStore() ;

useEffect(()  => {
if (commonStore.token) { //checking if we have a token in the commonstore

  userStore.getUser().finally(() => commonStore.setApploaded()) //After gettinmg  our current user, we persist 
}
else commonStore.setApploaded()

}, [commonStore , userStore]) 

if(!commonStore.apploaded) return <LoadingComponent content="Loading app..." />

//we removed all of these const {activityStore} = useStore ();
    // const{selectedActivity, editMode} = activityStore; 
    // useEffect(() => { activityStore.loadActivities() ;
    // },[activityStore] ) because when dont want to load our activities when only visiting the home page, the load should be applied when naviugating to the activities so we will put it in the activities dashborad where we want to load our activities


//const{activityStore} = useStore() ; //  "MOBX PART"we are destructuring the object because we are just interested in the actiovity that we stored in this store



  // this component have to remember the data that has been fetched by our API, so he will store it inside its own state that we will create using react hooks used to remember data, which is usestate, we are fetching an array of activity then our state have to be of type Array[]
  // in our example, we are fetching the instance activites , each compomenet has a state, to set the value fetched to the component state, we will goanna use a certain function that is given as a parameter in the use state.
 // const [activites,setActivities] = useState<Activity[]>([]); //it is given initially an empty array, this the state of the component created.
 // once we this data fetched and stored in activites, we can use it in the return statment inside our component to display it to the client.
 // when this operation start there is some effects, then we will use the useEffect hook.


  //const[selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined) ;// epecting to save an activity in the user state, this activity can be undifeined and the initial state is undefined.
 // const[editMode,setEditMode] = useState(false) ; //used to edit or create activities using the form
 // const [loading,setLoading] = useState(true) ; // state or hook function used to set if there is a loading or not
  //const[submitting, setSubmitting] = useState(false);
//we're loading a list of our activities currently, and we're storing this in local states.
//useEffect(() => {
  //axios.get<Activity[]>('http://localhost:5000/api/activities') INSTEAD.
 /* agent.Activities.list().then(response => { // after this promise, we get response which is the response of the Axios, which is an Activity array from the activity.ts model
    const activities: Activity[] = []; //new array of type activities
    response.forEach(activity => {
      activity.date = activity.date.split('T')[0]; // we will split the text based on the T type with takimg the first part of the date [0] thats mean that we dont take the time clk imformation
      activities.push(activity); 
    })
    setActivities(activities); //we are getting the list of activities from axios that go in the port 5000 of the db, and then storimg it in our activities state
    // WE are setting now the new array which display the date as its real type with the given data
    setLoading(false)
  })
   //this the fetch that happened using axios, we are getting activities from this url, this is a promise.
   */
  ///activityStore.loadActivities() ;
//},[activityStore] ) //this empty array ensure the one dependency that the useEffect hook have, it is recomanded, dependecies are also contained inside an array, one dependecy means that the useEffect is only callled once


// function handleSelectActivity(id : string) {
//   setSelectedActivity(activites.find(x => x.id ===id)) ; // x holds an activity element in the activiies array, go and find the element that really holds this id and then return true
// }

// function handleCancelSelectActivity() {
//   setSelectedActivity(undefined);
  
// }

// function handleFormOpen(id? : string) { {/* when we are opening the form to edit or to crearte */}
//      if (id) {
//        handleSelectActivity(id) ;
//      } else handleCancelSelectActivity() ;
      
//      {/* id this id exist, select this activity with id and then we can edit it so we will set edit mode tp true */}
//     setEditMode(true);
// }
// function handleFormClose() { {/* when we will goanna create an activity , not editing we cannot edit our activity*/}
//  setEditMode(false) ;
// }

// function handleCreateOrEditActivity(activity: Activity) { // THIS ONE GOES THE DEEPER AN REALLY EDIT THE ACTIVITY AND PUT IT IN THE BOTTOM OF THE LIST
//   setSubmitting(true); //as we want to submit our activity, and start our loading indicators







// // THIS IF ELSE IS WITH USING THE REQUEST OF OUR API MANAGED BY AXIOS, SO WE WILL HAVE CONNECTION WITH THE BACKEND, WE ARE USING OUR AGENT FILE





//   if(activity.id ) { //if the activity exist. 
//    agent.Activities.update(activity).then(() => {
//     setActivities([...activites.filter(x=>x.id !== activity.id) ,activity])  //we are selecting the activity from the activities array with a different id and edit it by replacing it by the activity given in parameter.
//     // this line of code do the necessary update. the spread operrator ... is used to take all the current elements of the activities array and spread them into a new array. This creates a shallow copy of the original activities array., x holds the activity fetched from the activity array
//     setSelectedActivity(activity);
//     setEditMode(false)
//     setSubmitting(false)
//          //this is what we mean by loading our activities. 
//    })
//   }
//   else { //in case of creating an activity

//     activity.id = uuid(); //the function uuid is generating a unique id and giving it to activity.id 
//     agent.Activities.create(activity).then(() => {
//     setActivities([...activites,{...activity}])
//     })
//     setSelectedActivity(activity);
//     setEditMode(false);
//     setSubmitting(false)

      
//   }




// // THIS IF ELSE IS WITH USING THE NORMAL REACT APP WITHOUT ACCESSING THE BACKEND, WITHOUT THE USE OF API, DOING IT LOCALLY NOW WE WILL NOT USE IT ANYMORE


// /*
//   if(activity.id ) // if the id exist, than we are editimg the activity 
//   setActivities([...activites.filter(x=>x.id !== activity.id) ,activity])
//   else setActivities([...activites,{...activity, id:uuid()}]) // in case when create an activity when the id doesnt exist, and also in vid 57 we generated a new id for our new activity, this activity created will be set in the activities array that we spreaded ,{ ...activity, id: uuid() } creates a new object with all the properties of activity, but also assigns a unique id to it (using uuid()).
//   setEditMode(false);
//   setSelectedActivity(activity); //then we create our activity

//    */
  
// }

// function handleDeleteActivity(id : string) {
//   setSubmitting(true)
//   agent.Activities.delete(id).then(() => {
//     setActivities({...activites.filter(x => x.id !==id)}) //as lucien I understand it that we did not give a second parameter to the setactivities, then we are replacing the activity with the specified id by nothing, which is DELETING this activity.
//     setSubmitting(false) ;
//   })
  

// }
//if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return( // what the client is really seeing now, 
    <div>
      <ScrollRestoration />
      <ModalContainer />
      <ToastContainer position = 'bottom-right' hideProgressBar theme ='colored'/>
      {/* we want our toast notification for errors  to be available for every componet, so we will put it in the top */}
      {location.pathname === '/' ? <HomePage /> : ( //else we go to the childrens in our outlet.
        <div>
      <NavBar /*openForm={handleFormOpen}*//> {/* we want to add the openForm to the navbar where our create activity button is created */}
      <Container style={{marginTop: '7em'}}>
      {/*<h2>{activityStore.title}</h2>
      <Button content='Add exclamation !' positive onClick={activityStore.setTitle} />*/}
     <Outlet/> {/*by using outlet, when a route is loaded, this gets swapped with the actual component that we are loading , So when we go to activities, the outlet is going to be swapped with the activity dashboard.

When we go to our home page, this is going to be swapped with home page, that kind of thing.*/}
      {/* //activities={activityStore.activities}
     // selectedActivity={selectedActivity} //the entity to select
     // selectActivity={handleSelectActivity} //selectActivity here is function, different from the one near const
     // cancelSelectActivity={ handleCancelSelectActivity}
     // editMode={editMode}
     // openForm={handleFormOpen}
     // closeForm={handleFormClose}                                              WE ARE REMOVING ALL OF THESE, OUR FOCUS IS NOW IN THE ACTIVitystore
      //createorEdit={handleCreateOrEditActivity}
      //deleteActivity={handleDeleteActivity}
      //submitting={submitting} */}

       {/*ivityDashboard is a child from the app componenet, it is contained inside the app compnent  */}

      </Container>
     
    </div> //div or fragment have the same puropose to put elements as a block in the code.
    // Each child in a list should have a unique "key" prop.DuckItem key ={duck.name}

    // duck in map(duck=>) refers that we are working with every duck in the array, it is the parameter of type Duck
    // finally, we integrate our component in this react app, aiming for our objective of react architechture. by the last line of code we breaked things up with components
    
  )}

  </div>
  );
}
export default observer(App)



//return(
 // <div>
   // <h1>Reactivities</h1> 
     //{ducks.map(duck=> (
      //<DuckItem key ={duck.name} duck={duck} /> // {duck} is the parameter that we created, duck is the element of the interface Props. duck=> significally means that we areb returniing instances from the ducks arraysn in demo 
  //))}
 // </div>
  // Each child in a list should have a unique "key" prop.DuckItem key ={duck.name}

  // duck in map(duck=>) refers that we are working with every duck in the array, it is the parameter of type Duck
  // finally, we integrate our component in this react app, aiming for our objective of react architechture. by the last line of code we breaked things up with components
  

