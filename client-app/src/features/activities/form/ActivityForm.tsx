import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
// the form is used to create and delete activities that we want
interface Props{
    activity: Activity | undefined;
    closeForm: () => void;
    createorEdit:(activity: Activity) => void;
    submitting : boolean
}
export default function ActivityForm({activity : selectedActivity ,closeForm, createorEdit, submitting } : Props) {

    const initialState = selectedActivity ?? { //it is the selected activity if it is not null or it is the ' ' if the activity is null
        id: ' ',
        title: ' ',
        category: ' ',
        description: ' ',
        date: ' ',
        city: ' ',
        venue: ' ',
        
    }

    const [activity, setActivity] = useState(initialState) ; //storimg this initial state in activity using set activity , initial state is its initial value.
 
   function handleSubmit() { //this one is just used to process the submit of a form
    createorEdit(activity); // when processing the submit, we are then editing our activity
} //we can edit an activity at this stage

function handleInputChange(event:ChangeEvent<HTMLInputElement>) { //this is the one that ensure the change occured in the input field, it takes the event from the input field to occur its change

    const {name, value} = event.target; //we are targeting from the event the name and the value of the input element
    setActivity({...activity, [name]:value}) // ... means that we are giving the properties of the activity, 
}
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete = 'off'  > {/* to not automatically complete the field insisde the input field of the form */}
                <Form.Input placeholder='Title' value = {activity.title} name = 'title' onChange={handleInputChange}/>
                <Form.Input placeholder='Description'  value = {activity.description} name = 'description' onChange={handleInputChange}/>
                <Form.Input placeholder='category'  value = {activity.category} name = 'category' onChange={handleInputChange}/>
                <Form.Input type ='date' placeholder='Date'  value = {activity.date} name = 'date' onChange={handleInputChange}/> {/* type date make it d/m/y */}
                <Form.Input placeholder='City'  value = {activity.city} name = 'city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue '  value = {activity.venue} name = 'venue' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type = 'submit' content='Submit'  value = {activity.title} name = 'title' /> {/* whe are givin the loading element the submitting if it is true or false to let the loading element displays */}
                <Button onClick={closeForm} floated='right' type = 'button' content='Cancel'  value = {activity.title} name = 'title' /> {/* onclick on cancel, we are closing the form after submitting it*/}
             
            {/*  value = {activity.title} name = 'title' holds the title of the activity in he input field Title before changing it in  */}

            </Form >
        </Segment>
    )
}