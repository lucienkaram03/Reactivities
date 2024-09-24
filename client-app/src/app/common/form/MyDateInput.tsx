import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { FormField, Label } from "semantic-ui-react";


export default function MyDateInput(props: Partial<ReactDatePickerProps>) {

    const [field , meta ,helpers] = useField(props.name!) //we are getting the extra data and filed from our inputfield

return(
    <FormField  error ={meta.touched && !!meta.error} > {/* !! means that we transformed the meta.error into a boolean, our error happens under these 2 conditions */}

<DatePicker
{...field}
{...props}
selected ={(field.value && new Date(field.value)) || null} //if there is value in our field, than we set our date picker based on this value
onChange={value => helpers.setValue(value)} //setting the value using the helpers.
 />
{meta.touched && meta.error ? ( //if we have an error , display the error in red, else return null
    <Label basic color='red'> {meta.error}</Label> //meta.error is goanna be a string if it exist
) : null}
        
    </FormField>
)

}