

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";


interface Props {
    activity : Activity
}

//getting the activity list item into their own component to style them all at the same time.
export default function ActivityListItem ({activity} : Props) {
   
    return( 
        <Segment.Group>
            <Segment>
                {activity.isCancelled && 
                <Label attached='top' color='red' content='cancelled' style={{textAlign: 'center'}} /> 
}
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom : 3}} size = 'tiny' circular src ='/assets/user.png' />
                        <Item.Content >
                            <Item.Header as={Link} to='/activties'> {activity.title} </Item.Header>
                            <Item.Description>
                                Hosted by {activity.host?.displayName}
                            </Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color = 'orange'>
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>

                            )}

                              {activity.isGoing && !activity.isHost &&(
                                <Item.Description>
                                    <Label basic color = 'green'>
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                                )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment> 
                <span>
                    <Icon name='clock' /> { format(activity.date! , 'dd MM yyy h:mm aa' )} 
                    <Icon name = 'marker'/> {activity.venue}
    
                </span>
            </Segment>
            <Segment secondary > {/* secondary segments appears in a very light color */}
               <ActivityListItemAttendee attendees={activity.attendees!} />
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

