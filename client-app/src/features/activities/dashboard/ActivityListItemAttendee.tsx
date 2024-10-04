import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";
interface Props{
    attendees :Profile[];
}
export default observer(function ActivityListItemAttendee({attendees} : Props){ //creating our component of list of attendees to an activity

const styles = {
    borderColor : 'orange' ,
    borderWidth : 2 
}



return (

    <List horizontal >
{attendees.map(attendee => ( //now each item depends on how much attendees we had before
<Popup 
hoverable
key={attendee.username} 
trigger ={
    <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}> {/* then we automatically link into our attendee profiel */}
            <Image size = 'mini'
             circular src = {attendee.image ||'/assets/user.png'}
             bordered
             style = {attendee.following ? styles : null} // putting an orange border around the profile of the attendee if the user follows one of these attendees
             
             />
        </List.Item>
}


>
    <Popup.Content>
        <ProfileCard profile={attendee} />
    </Popup.Content>

</Popup>

))}
        
        
    </List>
)


}



)