import { observer } from "mobx-react-lite";
import { Divider, Grid, Header, Item, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import FollowButton from "./FollowButton";

export interface Props {

    profile : Profile ;

}





export default observer (function ProfileHeader({profile} : Props) { //entire profile page, this file is dedidcated to the header of the profile page
return(
    <Segment>
        <Grid>
            <Grid.Column width={12}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar size = 'small' src={ profile.image ||'/assets/user.png'} />
                        <Item.Content verticalAlign="middle" />
                        <Header as='h1' content ={profile.displayName} />
                    </Item>
                    
                </Item.Group>

            </Grid.Column>
            <Grid.Column width={4} >
                <Statistic.Group widths={2}>
                    <Statistic label='Followers' value={profile.followersCount} />
                    <Statistic label='Following' value={profile.followingCount} />

                </Statistic.Group>
                <Divider /> {/* horizontal line to make bottons one near the others */}
              <FollowButton profile={profile} />

            </Grid.Column>
        </Grid>
    </Segment>
)



})