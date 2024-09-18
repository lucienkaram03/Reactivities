import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
// the form is used to create and delete activities that we want
//interface Props{
   // activity: Activity | undefined;
    //closeForm: () => void;
    //createorEdit:(activity: Activity) => void;
    //submitting : boolean
//}
export default observer(function ActivityForm(/*{activity : selectedActivity ,closeForm, createorEdit, submitting } : Props*/) {


    const{activityStore} = useStore() ;
    const{ createActivity, updateActivity, loading, loadActivity, loadingInitial} =activityStore;
   const {id} = useParams() ;
   const navigate = useNavigate() ; //using to navigate automaticcally to for example the activity that we created.
   const[activity, setActivity] = useState<Activity >({ 
    id: ' ',
        title: ' ',
        category: ' ',
        description: ' ',
        date: ' ',
        city: ' ',
        venue: ' ',

   }) ; 
   useEffect(() => { //effect when the activity is loaded.
       if(id) loadActivity(id).then(activity => setActivity(activity !))  //if the activity got from the useparams exist , we will load this activity an then set it in our registry.
   }, [id,loadActivity]) //the loadActivity(id) is returning a promise of type void, we want it to return an activity, so lets update the load activity in the activitystore,
   
   
   
   //to rember the activity that we want to edit when we get it back, we will store it in the state. 
    // const initialState = selectedActivity ?? { //it is the selected activity if it is not null or it is the ' ' if the activity is null
    //     id: ' ',
    //     title: ' ',
    //     category: ' ',
    //     description: ' ',
    //     date: ' ',
    //     city: ' ',
    //     venue: ' ',
        
    // }

    // const [activity, setActivity] = useState(initialState) ; //storimg this initial state in activity using set activity , initial state is its initial value.
 
   function handleSubmit() {  //this one is just used to process the submit of a form
    if( !activity.id ) {
        activity.id = uuid() ; //we created an activity.
        createActivity(activity).then(() => navigate(`/activities/${activity.id}`)) //in this case we navigate automatically to the activity that we created, to do that we need an id
        //createActivity gives us a promise, than we can use them.
   
    }  
    else updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))//in this case we navigate automatically to the activity that we created, to do that we need an id
    
    //createorEdit(activity); // when processing the submit, we are then editing our activity
 //we can edit an activity at this stage 
   }
function handleInputChange(event:ChangeEvent<HTMLInputElement>) { //this is the one that ensure the change occured in the input field, it takes the event from the input field to occur its change

    const {name, value} = event.target; //we are targeting from the event the name and the value of the input element
    setActivity({...activity, [name]:value}) // ... means that we are giving the properties of the activity, 
}

if(loadingInitial) return <LoadingComponent content=' LOADING ACTIVITY ...'  />
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete = 'off'  > {/* to not automatically complete the field insisde the input field of the form */}
                <Form.Input placeholder='Title' value = {activity.title} name = 'title' onChange={handleInputChange}/>
                <Form.Input placeholder='Description'  value = {activity.description} name = 'description' onChange={handleInputChange}/>
                <Form.Input placeholder='category'  value = {activity.category} name = 'category' onChange={handleInputChange}/>
                <Form.Input type ='date' placeholder='Date'  value = {activity.date} name = 'date' onChange={handleInputChange}/> {/* type date make it d/m/y */}
                <Form.Input placeholder='City'  value = {activity.city} name = 'city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue '  value = {activity.venue} name = 'venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type = 'submit' content='Submit'  value = {activity.title} name = 'title' /> {/* whe are givin the loading element the submitting if it is true or false to let the loading element displays */}
                <Button as={Link} to='/activiies' floated='right' type = 'button' content='Cancel'  value = {activity.title} name = 'title' /> {/* onclick on cancel, we are closing the form after submitting it*/}
             
            {/*  value = {activity.title} name = 'title' holds the title of the activity in he input field Title before changing it in  */}

            </Form >
        </Segment>
    )
})

function uuid(): string {
    throw new Error("Function not implemented.");
}
