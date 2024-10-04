import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
interface Props {
    profile : Profile ; 

}

export default observer(function Followbutton ({profile} : Props) {
    const{profileStore , userStore} = useStore(); 
    const {updateFollowing , loading } = profileStore ;

    if(userStore.user?.username === profile.username) return null  //if we are on the user profile we dont want to show this nutton , because this button appears when we are on another attendee to follow him

    function handleFollow (e : SyntheticEvent , username : string ) {
        e.preventDefault() ;
       if( profile.following ) updateFollowing(username , false) ;
       else updateFollowing(username , true ) ;
    }

    return(

        <Reveal animated='move' >
        <Reveal.Content visible style={{width: '100%'}} >
            <Button fluid 
             color ='teal'
              content={profile.following ? 'Unfollow ' : 'Follow'} />
        </Reveal.Content>
        <Reveal.Content hidden style={{width : '100%'}} >

            <Button 
            fluid
            basic
            // eslint-disable-next-line no-constant-condition
            color={profile.following  ? 'red' : 'green'} // if we are following the user currently

            // eslint-disable-next-line no-constant-condition
            content={profile.following ?  'Unfollow' : 'Follow'}
            loading={loading}
            onClick={(e) => handleFollow(e , profile.username)}
            />


        </Reveal.Content>
    </Reveal>

        
    )
})