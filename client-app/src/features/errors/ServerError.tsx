import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

// this is a new component to display the details of this content
export default observer( function ServerError() {
    const {commonStore} = useStore() ;
    return (
 <Container>
<Header as ='h1' content ='Server Error'/>
<Header sub as='h5' color="red" content={commonStore.error?.message} />
{commonStore.error?.details && (
    <Segment>
        <Header as='h4' content="stack trace" color="teal" />
        <code style={{marginTop: '10px'}}>{commonStore.error.details}</code>
    </Segment>
)}

</Container>
    )
}) 
//when we get a srever error, we goanna redirect them to the home page.