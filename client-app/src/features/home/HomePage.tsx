import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {

    return(

        <Container style = {{marginTop : '7em'}} >
        <h1> Home Page</h1>
        <h3>
             Go to <Link to = '/activites'> Activities </Link> 
             </h3>
        </Container>
    ) //then in our homepage we have now a heading that will take us to activity dashboard, not a bad navbar.

}