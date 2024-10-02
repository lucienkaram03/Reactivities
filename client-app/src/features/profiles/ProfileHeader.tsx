import { observer } from "mobx-react-lite";
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

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
                    <Statistic label='Followers' value='5' />
                    <Statistic label='Following' value='42' />

                </Statistic.Group>
                <Divider /> {/* horizontal line to make bottons one near the others */}
                <Reveal animated='move' >
                    <Reveal.Content visible style={{width: '100%'}} >
                        <Button fluid  color ='teal' content='Following' />
                    </Reveal.Content>
                    <Reveal.Content hidden style={{width : '100%'}} >

                        <Button 
                        fluid
                        basic
                        // eslint-disable-next-line no-constant-condition
                        color={true ? 'red' : 'green'}

                        // eslint-disable-next-line no-constant-condition
                        content={true ? 'Unfollow' : 'Follow'}
                        />


                    </Reveal.Content>
                </Reveal>


            </Grid.Column>
        </Grid>
    </Segment>
)



})