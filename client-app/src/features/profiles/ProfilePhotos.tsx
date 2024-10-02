import { observer } from "mobx-react-lite";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Photo, Profile } from "../../app/models/profile";

import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { useStore } from "../../app/stores/store";

interface Props{
    profile : Profile ;
}




export default observer(function ProfilePhotos ({profile}:Props) { //displaying the photos of the profile
    const {profileStore :{isCurrentUser , uploadPhoto,uploading, 
        loading, steMainPhoto, deletephoto }} = useStore();
    const [addPhotoMode , setAddPhotoMode] = useState(false) ;
    const[target , setTarget] = useState('');

// our upload photo method will be just here 

function handlePhotoUpload(file : Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));

}

function handleSetMainPhoto(photo: Photo , e: SyntheticEvent<HTMLButtonElement>)
{
    setTarget(e.currentTarget.name) ;
    steMainPhoto(photo) ;
}

function handleDeletePhoto(photo: Photo , e: SyntheticEvent<HTMLButtonElement>)
{
    setTarget(e.currentTarget.name) ;
    deletephoto(photo) ;
}





    return (

        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                <Header floated="left" icon='image' content='Photos' /> {/* this is the icon of the image */}
                {isCurrentUser && (
                    <Button floated='right' basic
                    content={addPhotoMode ? 'cancel' : 'Add Photo'} //when the add photo mode = false, we have a button add photo, we click on it, the add photo mode is now true
                    onClick={() => setAddPhotoMode(!addPhotoMode)} //we are passing the oposite of what it is.
                    />
                )} 


                </Grid.Column>
                <Grid.Column width={16}>

                    {addPhotoMode ? (
                       <PhotoUploadWidget uploadPhoto = {handlePhotoUpload} loading={uploading}/>
                    )  :  (


//now here we are going back to the first event when we clikced the add photo button
                        <Card.Group itemsPerRow={5}>
                        {profile.photos?.map(photo => ( //for each photo in our photos array of photos, we are looping in this array
                             <Card key={photo.id}>
                             <Image src={photo.url} /> 
                             {isCurrentUser && ( //only the current user can update the main photo
                                <Button.Group fluid widths={2} >
                                    <Button  //this button is for each photo in the photos of the user
                                    basic
                                    color='green'
                                    content='main'
                                    name={'main' + photo.id}//adding main just to make the difference between the two buttons
                                    disabled={photo.isMain} 
                                    loading={target ==='main' + photo.id && loading}
                                    onClick={e => handleSetMainPhoto(photo , e)}
                                    />

                                    <Button
                                     basic 
                                     color="red"
                                      icon='trash' 
                                      loading={target === photo.id && loading}
                                      onClick={e => handleDeletePhoto(photo , e)}
                                      disabled={photo.isMain}
                                      name={photo.id}
                                       /> 
                                    {/* this one is for our deleting a photo */}


                                </Button.Group>
                             )}
                         </Card> 
                        ))}


                          </Card.Group>



                    )}

                </Grid.Column>
                
            </Grid>
           
           
               
                {/* <Card>
                    <Image src={'/assets/user.png'} />
                </Card>
                <Card>
                    <Image src={'/assets/user.png'} />
                </Card> */ } {/* those 2 last cards where here to show the example where we didnt disaply the photos of the user, now we have them and we just mapp */}
          
        </Tab.Pane>

    )
})