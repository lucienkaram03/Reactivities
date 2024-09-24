import { useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";

interface Props{ //model for our input field
    placeholder : string;
    name : string; 
    options: {text: string}[] ;
    label?: string;
}
export default function MySelectInput(props : Props) {

    const [field , meta, helpers] = useField(props.name) //we are getting the extra data and filed from our inputfield

return(
    <FormField  error ={meta.touched && !!meta.error} > {/* !! means that we transformed the meta.error into a boolean, our error happens under these 2 conditions */}

<label>  {props.label}</label>
<Select 
 clearable
options = {props.options}
value={field.value || null}
onChange={(_,d) => helpers.setValue(d.value)   } //onchange take an event and a data as a parameter, but we dont need the eventhere so it is dashed
onBlur={()  => helpers.setTouched(true)}
placeholder={props.placeholder}

 />





{meta.touched && meta.error ? ( //if we have an error , display the error in red, else return null
    <Label basic color='red'> {meta.error}</Label> //meta.error is goanna be a string if it exist
) : null}
        
    </FormField>
)

}