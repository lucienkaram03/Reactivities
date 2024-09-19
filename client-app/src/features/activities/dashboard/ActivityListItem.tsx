

import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";


interface Props {
    activity : Activity
}

//getting the activity list item into their own component to style them all at the same time.
export default function ActivityListItem ({activity} : Props) {
   
    return( 
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src ='/assets/user.png' />
                        <Item.Content >
                            <Item.Header as={Link} to='/activties'> {activity.title} </Item.Header>
                            <Item.Description>
                                Hosted by Luc
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment> 
                <span>
                    <Icon name='clock' /> {activity.date} 
                    <Icon name = 'marker'/> {activity.venue}
    
                </span>
            </Segment>
            <Segment secondary > {/* secondary segments appears in a very light color */}
                Attendees go here
            </Segment>
            <Segment clearing>
            <span>{activity.description}</span>
                <Button as={Link} 
                to={`/activiies/${activity.id}`} //the url content activity.id because by this button we are selecting an activity, so we need the id of the activity selected to navigate to that activity
                 color='teal'
                 floated="right" 
                 content = "view"/> 
                  
            </Segment>
        </Segment.Group>
     )



 
 }

