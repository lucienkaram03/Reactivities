import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup'; //yup is the libarary that will let us generate the validation for our form
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { ActivityFormValues } from "../../../app/models/activity";
import { categoryOptions } from "../../../app/options/categoryOptions";
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
    const{  loadActivity, loadingInitial, createActivity,updateActivity} =activityStore;
   const {id} = useParams() ;
   const navigate = useNavigate() ; //using to navigate automaticcally to for example the activity that we created.
   const[activity, setActivity] = useState<ActivityFormValues >(new ActivityFormValues());
   

 
const validationSchema = Yup.object({

title : Yup.string().required('The activity title is required'), //this is the message of validation
description : Yup.string().required('The activity description is required'),
category: Yup.string().required('The activity category is required'),
city: Yup.string().required('The activity city is required'),
venue: Yup.string().required('The activity venue is required'),
date: Yup.string().required('The activity date is required').nullable(),
    
    
})


   useEffect(() => { //effect when the activity is loaded.
       if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))  //if the activity got from the useparams exist , we will load this activity an then set it in our registry.
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
 
    function handleFormSubmit(activity : ActivityFormValues) {  //this one is just used to process the submit of a form
     if( !activity.id ) { //if we dont have a activity id than we are creating one
        const newActivity = {
          ...activity ,
          id: uuid()
        };
        createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
   
     }  
    else updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))//in this case we navigate automatically to the activity that we created, to do that we need an id
    
     //createorEdit(activity); // when processing the submit, we are then editing our activity
  //we can edit an activity at this stage 
    }
 function handleChange(event:ChangeEvent<HTMLInputElement>) { //this is the one that ensure the change occured in the input field, it takes the event from the input MyTextInput to occur its change

     const {name, value} = event.target; //we are targeting from the event the name and the value of the input element
    setActivity({...activity, [name]:value}) // ... means that we are giving the properties of the activity, 
 }

if(loadingInitial) return <LoadingComponent content=' LOADING ACTIVITY ...'  />
    return(
        <Segment clearing>
            <Header content="Activity Details" sub color= 'teal' />
            <Formik 
            validationSchema={validationSchema}
             enableReinitialize  
               initialValues={activity} 
               onSubmit={values => handleFormSubmit(values)}>
                 {/* putting as an initial value the activity in the state, the onsubmit is just to setting up the from before working with it,we are getting the values from formik*/}
                 {/*  enableReinitialize  is used for initialize the initial activity that we passed to initial value. */}



                {({  handleSubmit, isValid, isSubmitting, dirty }) => ( //destruction the element that we will use from Formik
//the values are the activities that we are passing down in the initial values.


<Form className="ui form" onSubmit={handleSubmit} autoComplete = 'off'  > {/* to not automatically complete the MyTextInput insisde the input MyTextInput of the form */}
     < MyTextInput  name='title' placeholder="Title" /> 
<MyTextArea rows={3} placeholder='Description'   name = 'description' />
<MySelectInput options={categoryOptions} placeholder='category'  name = 'category' />
<MyDateInput
  placeholderText='Date' 
    name = 'date'
    showTimeSelect
    timeCaption='time'
    dateFormat='MMM d , yyy h:mm aa' /> {/* type date make it d/m/y */}


<Header content="Activity Locaction" sub color= 'teal' />
<MyTextInput placeholder='City'   name = 'city' />
<MyTextInput placeholder='Venue '   name = 'venue' />
<Button 
disabled={isSubmitting || !dirty ||!isValid} 


loading={isSubmitting} floated='right' positive type = 'submit' content='Submit'  value = {activity.title} name = 'title' /> {/* whe are givin the loading element the submitting if it is true or false to let the loading element displays */}
<Button as={Link} to='/activiies' floated='right' type = 'button' content='Cancel'  value = {activity.title} name = 'title' /> {/* onclick on cancel, we are closing the form after submitting it*/}
</Form>
)}
{ /*  value = {activity.title} name = 'title' holds the title of the activity in he input MyTextInput Title before changing it in  */}

                
                </Formik>
           

            
        </Segment>
    )
})

// function uuid(): string {
//     throw new Error("Function not implemented.");
// }
