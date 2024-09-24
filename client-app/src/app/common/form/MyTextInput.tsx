import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

interface Props{ //model for our input field
    placeholder : string;
    name : string; 
    label?: string;
}
export default function MyTextInput(props : Props) {

    const [field , meta] = useField(props.name) //we are getting the extra data and filed from our inputfield

return(
    <FormField  error ={meta.touched && !!meta.error} > {/* !! means that we transformed the meta.error into a boolean, our error happens under these 2 conditions */}

<label>  {props.label}</label>
<input {...field} {...props} /> 
{meta.touched && meta.error ? ( //if we have an error , display the error in red, else return null
    <Label basic color='red'> {meta.error}</Label> //meta.error is goanna be a string if it exist
) : null}
        
    </FormField>
)

}