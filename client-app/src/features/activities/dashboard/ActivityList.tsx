import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

//interface Props {
    //activities : Activity[] ;
   // selectActivity : (id : string ) => void;
   // deleteActivity:(id : string ) => void;
    //submitting: boolean;
    
//}

export default observer( function ActivityList( /*{activities,deleteActivity,submitting} : Props*/) {
    const{activityStore} = useStore() ;
    const{deleteActivity,activitiesByDate,loading} = activityStore




 const [target , setTarget] = useState(' ')// this state will contain the name of the button
 function handleActivityDelete(e :SyntheticEvent<HTMLButtonElement>, id : string) { //e is the event that we are retreiving from the button
  setTarget(e.currentTarget.name) ;  //targeting the name of the event and then deleting it 
  deleteActivity(id) ; //and then deleting it 
 }
 
 
return(
    <Segment>
        <Item.Group divided>
            {/* now its just like a for loop for each activity in the activities list, where we are styling each element in the list */}
            {activitiesByDate.map(activity => (   
                <Item key={activity.id} >
                    <Item.Content>
                        <Item.Header as='a'>{activity.title} </Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city},{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button as={Link} to ={`/activities/${activity.id}`} floated='right' content='View' color='blue' /> {/* when we click on view button we select an activity , so it is a must that the selectActivity function have to be present in the button */}
                            <Label basic content ={activity.category} />
                            <Button
                            name={activity.id}
                             loading={loading && target === activity.id} 
                             onClick={(e) => handleActivityDelete(e, activity.id)}
                             floated='right'
                             content='Delete'
                             color='red' />
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}

        </Item.Group>
    </Segment>

)
})
