import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities : Activity[] ;
    selectActivity : (id : string ) => void;
    deleteActivity:(id : string ) => void;
}

export default function ActivityList( {activities,selectActivity,deleteActivity} : Props) {

return(
    <Segment>
        <Item.Group divided>
            {/* now its just like a for loop for each activity in the activities list, where we are styling each element in the list */}
            {activities.map(activity => (   
                <Item key={activity.id} >
                    <Item.Content>
                        <Item.Header as='a'>{activity.title} </Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city},{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' /> {/* when we click on view button we select an activity , so it is a must that the selectActivity function have to be present in the button */}
                            <Label basic content ={activity.category} />
                            <Button onClick={() => deleteActivity(activity.id)} floated='right' content='Delete' color='red' />
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}

        </Item.Group>
    </Segment>

)
}
