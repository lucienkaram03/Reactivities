import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

import FacebookLogin, { FailResponse, SuccessResponse } from "@greatsumini/react-facebook-login";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export  default observer(function HomePage(){
const{userStore , modalStore} = useStore() ;
return (
    <Segment inverted textAlign="center" vertical className="masthead" >
   
   <Container text>
    <Header as='h1' inverted> 

    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
    Reactivities 
    </Header>

   ({userStore.isLoggedIn} ? 

<>
<Header as='h2' inverted content='Welcome to Reactivities' />
<Button as={Link} to='/activites' size='huge' inverted >Go to activities!</Button>
</>
    
   ) : (



  

  
    



   
  
  <>
  
  <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted >LOGIN!</Button>
  <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted >Register Form</Button>
  <FacebookLogin 
  appId="506392585490776"
  onSuccess={(response : SuccessResponse) => {
    userStore.facebookLogin(response.accessToken) ; 
  }}
  onFail={(response : FailResponse) => {
    console.log('Login Failed!' , response ) ;
  }}
  className={`ui button facebook huge inverted ${userStore.fbLoading && 'loading'} `} //this one is for styling our fb login button.
  />


  </>

   )
   
   
    
    

   </Container>
   </Segment>

)

})













 //     return(

//         <Container style = {{marginTop : '7em'}} >
//         <h1> Home Page</h1>
//         <h3>
//              Go to <Link to = '/activites'> Activities </Link> 
//              </h3>
//         </Container>
//     ) //then in our homepage we have now a heading that will take us to activity dashboard, not a bad navbar.>