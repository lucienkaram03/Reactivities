import { ErrorMessage, Form, Formik } from "formik";

import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import ValidationError from "../errors/ValidationError";
export default observer(function RegisterForm() { //this is our login react method
const {userStore} = useStore();//means that we can retreive from this store.
    return (
       <Formik 
       initialValues={{displayName: ' '  , username: ' '  ,     email : ' ' ,password: ' ' , error: null}}
       onSubmit={(values , {setErrors}) => 
        userStore.register(values).catch((error)=> 
        setErrors({error}) //setError is the method to set the error
       )}
       validationSchema={Yup.object ({ //ensuring the validation when registring, cheking if everything is here.
        displayName : Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        
    
       })}> 
        
       {/* those are the values that we get from the form , we are passing them to the login prop inside store 
       this is where the submit happens, here we can catch the error*/}

        {({handleSubmit, isSubmitting, errors, isValid , dirty}) => (
            <Form className=" ui form error" onSubmit={handleSubmit} autoComplete="off">
<Header as='h2' content='Sign up to Reactivities' color='teal' textAlign="center" /> {/* this is a title for our modal */}
<MyTextInput placeholder="Email" name='email' />
<MyTextInput placeholder="Display Name" name='displayName' />
<MyTextInput placeholder="User Name" name='username' />
<MyTextInput placeholder="Password" name='password' type = 'password' />
<ErrorMessage name='errror' render ={() => 
    <ValidationError errors ={errors.error as unknown as string[]} />}  //valdation error file that we did last time, that contains all the features of a specicfics errors
/>
<Button
disabled={!isValid || dirty ||isSubmitting}
 loading={isSubmitting} 
positive content='Register'
 type="submit" fluid />

            </Form>


        )}
       
       </Formik>
    )
    
})