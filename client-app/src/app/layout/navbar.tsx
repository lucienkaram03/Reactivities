import { Button, Container, Dropdown, DropdownItem, DropdownMenu, Image, Menu } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
// interface Props{
// //openForm: () => void; //this one doesntneed a patameter because it is used to create an activity, only editing needs the id of the actyivity to be edited.
// }


export     default  observer( function NavBar(/*{openForm}:Props*/){ //this is a component that we will add to our app component
//observer to know if our user object has been updated in our store
  //const {activityStore} = useStore () ; //we have always to mention for every component that it is using the
const {userStore: {user , logout}} =useStore();

    return(
        <Menu inverted fixed='top'> 
            <Container>
            <Menu.Item as={NavLink} to = '/' header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} /> Reactivities {/* logo is the legend of the image that we are using */}
            </Menu.Item>
            <Menu.Item as = {NavLink} to ='/activities' name='Activities' />
            <Menu.Item as = {NavLink} to ='/errors' name='Errors' />
            <Menu.Item>
                <Button as= {NavLink} to='/createactivity'positive content ='Create Activity' />{/* positive content made them green , we are opening a form to create our activity */}
            </Menu.Item>
            <Menu.Item position = 'right' >
                <Image src ={user?.image || '/assets/user.png'} avatar spaced='right' />
               <Dropdown pointing ='top left' text={user?.displayName} >

                <DropdownMenu>

                <DropdownItem as={Link} to ={`/profiles/${user?.username}`} text = 'My profile' icon = 'power' />
                <DropdownItem onClick={logout} text='logout' icon = 'power' />
                </DropdownMenu>


               </Dropdown>
            </Menu.Item>
           </Container>


        </Menu>
    )
})
