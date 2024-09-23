import { Message } from "semantic-ui-react";

interface Props {
    errors: string[] ;
}

export default function ValidationError({errors} : Props) { //errors is ou array of errors
    return(
        <Message error >
            {errors && (<Message.List>
                {errors.map((err: string , i) => ( //i is justthe index
                    <Message.Item key = {i}>  {err}   </Message.Item>
                )
                 ) }
            </Message.List>)}
        </Message>

    ) 
}