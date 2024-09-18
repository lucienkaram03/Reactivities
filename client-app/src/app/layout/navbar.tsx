import { Button, Container, Menu } from 'semantic-ui-react';

import { NavLink } from 'react-router-dom';
// interface Props{
// //openForm: () => void; //this one doesntneed a patameter because it is used to create an activity, only editing needs the id of the actyivity to be edited.
// }


export default function NavBar(/*{openForm}:Props*/){ //this is a component that we will add to our app component

  //const {activityStore} = useStore () ; //we have always to mention for every component that it is using the

    return(
        <Menu inverted fixed='top'> 
            <Container>
            <Menu.Item as={NavLink} to = '/' header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} /> Reactivities {/* logo is the legend of the image that we are using */}
            </Menu.Item>
            <Menu.Item as = {NavLink} to ='/activities' name='Activities' />
            <Menu.Item>
                <Button as= {NavLink} to='/createactivity'positive content ='Create Activity' />{/* positive content made them green , we are opening a form to create our activity */}
            </Menu.Item>
           </Container>


        </Menu>
    )
}
