import { observer } from 'mobx-react-lite';

import { Comment, Header, Loader, Segment } from 'semantic-ui-react';

import { Field, FieldProps, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

import { formatDistanceToNow } from 'date-fns';
import * as Yup from 'yup';
//doing the configuration for the activitychat, let now a chat happens 
interface Props {
    activityId : string ;
}

export default observer(function ActivityDetailedChat({activityId} : Props  ) {
    const {commentStore} = useStore() ;
    useEffect(() =>  {
        if(activityId) {
            commentStore.createHubConnection(activityId) ; 
        }
        return () => {
            commentStore.clearComments() ;//when the user is disconnected.
        }
    },[commentStore , activityId])





    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
            <Formik 
                    onSubmit={(values , {resetForm}) => commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{body : ''}}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                    >
                        {({isSubmitting , isValid, handleSubmit}) => (

<Form className='ui form'>
    <Field name = 'body'>
        {(props: FieldProps) => (
            <div style={{position : 'relative'}}>
                <Loader active={isSubmitting} />
                <textarea
                  placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                  rows={2}
                  {...props.field}
                  onKeyDown= {e => {
                    if(e.key === 'Enter' && !e.shiftKey) { //allowing to go back to the line this time
                        e.preventDefault() ;
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        isValid && handleSubmit() ;
                    }
                  }}
                  />

            </div>
        )   }
    </Field>

</Form>





)}
{/* <MyTextArea placeholder = 'Add comment' name='body'  rows={2}/>
<Button
loading={isSubmitting || !isValid}
    content='Add Reply'
    labelPosition='left'
    icon='edit'
    primary
    type='submit'
    floated='right'
/> */}

                    </Formik>
                <Comment.Group>
                    {commentStore.comments.map(comment => (

<Comment key={comment.id} >
<Comment.Avatar src={ comment.image ||'/assets/user.png'}/>
<Comment.Content>
    <Comment.Author as={Link } to ={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
    <Comment.Metadata>
        <div>{formatDistanceToNow(comment.createdAt)} ago </div> {/* about 7 hours ago */}
    </Comment.Metadata>
    <Comment.Text style ={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text> {/* prewrap makes the space btween line when we press enter */}
   
</Comment.Content>
</Comment>

                    ))}
                   

                    
                    


                   
                </Comment.Group>
            </Segment>
        </>

    )
})
