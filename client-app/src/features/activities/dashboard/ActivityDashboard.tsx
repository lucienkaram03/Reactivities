import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
//ACTIVITY DASHBOARD IS THE HOLE BODY CONTENT OF THE WEB APPLICATION THAT CONTAIN EVERYTHING: LIST , DETAILS, FORMS, BUTTONS
interface Props {
    activities: Activity[] ;
    selectedActivity: Activity | undefined;
    selectActivity : (id : string ) => void; //it returns nothing 
    cancelSelectActivity: () =>void;
    editMode: boolean;
    openForm: (id : string) => void;
    closeForm:() => void;
    createorEdit:(activity : Activity) => void;
    deleteActivity : (id : string) => void;
    submitting : boolean

}
export default function ActivityDashboard({activities, selectedActivity, submitting,
    selectActivity, cancelSelectActivity , editMode,openForm,closeForm, createorEdit , deleteActivity } : Props) { 
    return (
          <Grid>
            <Grid.Column width='10'>


          {/* <List>
        {props.activities.map((activity) => ( //we are getting each activitiy from the activities that we fetched from setActivities and displayiong its title
        //then our activity is not any more of type any but of type Activity Array
          <List.Item key={activity.id}>
            {activity.title} 
          </List.Item>
        ))}
      </List>*/}  
 
   <ActivityList
    activities={activities}
     selectActivity={selectActivity} 
     deleteActivity={deleteActivity}
     submitting = {submitting} /> {/* just by adding this line, we jump into the activityList file which is a child of activity dashboard . So the select activity function we actually need to pass down to our activities list.*/}

            </Grid.Column>
            <Grid.Column width ='6'>
               {selectedActivity && !editMode 
               && <ActivityDetails  //this !editMode  will remove activity details when we are in editing, thats what Neil wants
               activity = {selectedActivity} 
               cancelSelectActivity={cancelSelectActivity}
               openForm={openForm} 
              
               /> }{/*So what I'll do is I'll just hard code in one of the activities and we'll just access the activity index of zero just so that we've got something to look at in our component. && is used to verify that our activties element exist*/}
               {/* we want to create a card and present the details of our selected activity, so it have to be present in the ActivtyDetails */}
               {editMode &&
            <ActivityForm closeForm={closeForm} activity={selectedActivity} createorEdit={createorEdit} submitting={submitting} />} {/* when we are in edit mode we want to display our activity so we put &&editmode with activty={selectedactivity} */}

            </Grid.Column>
          </Grid>
    )

}
