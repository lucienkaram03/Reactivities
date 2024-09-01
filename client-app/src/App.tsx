
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import './App.css';

function App() { // this is our app component 
  // this component have to remember the data that has been fetched by our API, so he will store it inside its own state that we will create using react hook used to remember data, which is usestate
  // in our example, we are fetching the instance activites , each compomenet has a state, to set the value fetched to the component state, we will goanna use a certain function that is given as a parameter in the use state.
  const [activites,setActivities] = useState([]); //it is given initially an empty array, this the state of the component created.
 // once we this data fetched and stored in activites, we can use it in the return statment inside our component to display it to the client.
 // when this operation start there is some effects, then we will use the useEffect hook.
useEffect(() => {
  axios.get('http://localhost:5000/api/activities')
  .then(response => { // after this promise, we get response which is the response of the Axios
    setActivities(response.data) //we get the data of the response
  })
   //this the fetch that happened using axios, we are getting activities from this url, this is a promise.
},[] ) //this empty array ensure the one dependency that the useEffect hook have, it is recomanded, dependecies are also contained inside an array, one dependecy means that the useEffect is only callled once
  return( // what the client is really seeing now, 
    <div>
      <Header as='h2' icon='users' content = 'Reactivities'  />
      <List>
        {activites.map((activity:any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
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
  


