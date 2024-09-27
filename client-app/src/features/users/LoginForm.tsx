import { ErrorMessage, Form, Formik } from "formik";

import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() { //this is our login react method
const {userStore} = useStore();//means that we can retreive from this store.
    return (
       <Formik 
       initialValues={{email : ' ' ,password: ' ' , error: null}}
       onSubmit={(values , {setErrors}) => userStore.login(values).catch(()=> 
        setErrors({error: 'Invalid email or password'}) //setError is the method to set the error
       )}>  
       {/* those are the values that we get from the form , we are passing them to the login prop inside store 
       this is where the submit happens, here we can catch the error*/}

        {({handleSubmit, isSubmitting, errors}) => (
            <Form className=" ui form" onSubmit={handleSubmit} autoComplete="off">
<Header as='h2' content='Login to Reactivities' color='teal' textAlign="center" /> {/* this is a title for our modal */}
<MyTextInput placeholder="Email" name='email' />
<MyTextInput placeholder="Password" name='password' type = 'password' />
<ErrorMessage name='errror' render ={() => 
    <Label style ={{marginBottom : 10}} basic color ="red" content ={errors.error} />}
/>
<Button loading={isSubmitting} positive content='Login' type="submit" fluid />

            </Form>


        )}
       
       </Formik>
    )
    
})