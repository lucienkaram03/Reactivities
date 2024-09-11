
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import NavBar from './navbar';


function App() { // this is our app component  //
  // this component have to remember the data that has been fetched by our API, so he will store it inside its own state that we will create using react hooks used to remember data, which is usestate, we are fetching an array of activity then our state have to be of type Array[]
  // in our example, we are fetching the instance activites , each compomenet has a state, to set the value fetched to the component state, we will goanna use a certain function that is given as a parameter in the use state.
  const [activites,setActivities] = useState<Activity[]>([]); //it is given initially an empty array, this the state of the component created.
 // once we this data fetched and stored in activites, we can use it in the return statment inside our component to display it to the client.
 // when this operation start there is some effects, then we will use the useEffect hook.


  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined) ;// epecting to save an activity in the user state, this activity can be undifeined and the initial state is undefined.
  const[editMode,setEditMode] = useState(false) ; //used to edit or create activities using the form
useEffect(() => {
  axios.get<Activity[]>('http://localhost:5000/api/activities')
  .then(response => { // after this promise, we get response which is the response of the Axios, which is an Activity array from the activity.ts model
    setActivities(response.data) //we get the data of the response, which is of type activity array
  })
   //this the fetch that happened using axios, we are getting activities from this url, this is a promise.
},[] ) //this empty array ensure the one dependency that the useEffect hook have, it is recomanded, dependecies are also contained inside an array, one dependecy means that the useEffect is only callled once


function handleSelectActivity(id : string) {
  setSelectedActivity(activites.find(x => x.id ===id)) ; // x holds an activity element in the activiies array, go and find the element that really holds this id and then return true
}

function handleCancelSelectActivity() {
  setSelectedActivity(undefined);
  
}

function handleFormOpen(id? : string) { {/* when we are opening the form to edit or to crearte */}
     if (id) {
       handleSelectActivity(id) ;
     } else handleCancelSelectActivity() ;
      
     {/* id this id exist, select this activity with id and then we can edit it so we will set edit mode tp true */}
    setEditMode(true);
}
function handleFormClose() { {/* when we will goanna create an activity , not editing we cannot edit our activity*/}
 setEditMode(false) ;
}

function handleCreateOrEditActivity(activity: Activity) { // THIS ONE GOES THE DEEPER AN REALLY EDIT THE ACTIVITY AND PUT IT IN THE BOTTOM OF THE LIST
  if(activity.id ) // if the id exist, than we are editimg the activity 
  setActivities([...activites.filter(x=>x.id !== activity.id) ,activity])
  else setActivities([...activites,{...activity, id:uuid()}]) // in case when create an activity when the id doesnt exist, and also in vid 57 we generated a new id for our new activity, this activity created will be set in the activities array that we spreaded
  setEditMode(false);
  setSelectedActivity(activity); //then we create our activity

    //we are selecting the activity from the activities array with a different id and edit it by replacing it by the activity given in parameter.
  // this line of code do the necessary update. the spread operrator ... is used to loop over our exisiting activities, x holds the activity fetched from the activity array
  
}

function handleDeleteActivity(id : string) {
  setActivities({...activites.filter(x => x.id !==id)}) //as lucien I understand it that we did not give a second parameter to the setactivities, then we are replacing the activity with the specified id by nothing, which is DELETING this activity.

}

  return( // what the client is really seeing now, 
    <div>
      <NavBar openForm={handleFormOpen}/> {/* we want to add the openForm to the navbar where our create activity button is created */}
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
      activities={activites}
      selectedActivity={selectedActivity} //the entity to select
      selectActivity={handleSelectActivity} //selectActivity here is function, different from the one near const
      cancelSelectActivity={ handleCancelSelectActivity}
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      createorEdit={handleCreateOrEditActivity}
      deleteActivity={handleDeleteActivity}

      /> {/*ivityDashboard is a child from the app componenet, it is contained inside the app compnent  */}

      </Container>
     
    </div> //div or fragment have the same puropose to put elements as a block in the code.
    // Each child in a list should have a unique "key" prop.DuckItem key ={duck.name}

    // duck in map(duck=>) refers that we are working with every duck in the array, it is the parameter of type Duck
    // finally, we integrate our component in this react app, aiming for our objective of react architechture. by the last line of code we breaked things up with components
    
  )
}
  

export default App



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
  


