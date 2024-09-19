import { Grid } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
// this file is used to add the extra card in the right of the dashboard created
/*interface Props{
    activity : Activity;
    //cancelSelectActivity: () =>void;   
    //openForm: (id : string) => void;
}*/
export default  observer (function ActivityDetails(/*{activity, cancelSelectActivity, openForm} : Props*/) {
  const{activityStore} = useStore() ; //telling each of our comppnent that we are using an activity from our store.
  const{selectedActivity : activity, loadActivity, loadingInitial} = activityStore; //retreiving the observable data from the activityStore, making it in a easy way.
  const {id} = useParams() ; //the use params is the hook that fetch the id of the indidvidual activity

useEffect(() => {
  if(id) loadActivity(id) ;
} , [id, loadActivity])

  if(loadingInitial || !activity) return <LoadingComponent/>; //veryfing of the activity is undefined
  return (
    <Grid>
      <Grid.Column width ={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat/>
      </Grid.Column>

      <Grid.Column width ={6} >
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
})









//return(
  //       <Card fluid>
  //    <Image src={`/assets/categoryImages/${activity.category}.jpg`} />{/* `` are used to add strings inside a JSX element */}
  //   <CardContent>
  //     <CardHeader>{activity.title}</CardHeader>
  //     <CardMeta>
  //       <span >{activity.date}</span>
  //     </CardMeta>
  //     <CardDescription>
  //       {activity.description}
  //     </CardDescription>
  //   </CardContent>
  //   <CardContent extra>
  //   <Button.Group widths='2'>
  //   <Button  as ={Link} to={ `/manage/${activity.id}`}basic color='blue' content ='Edit' /> {/* when we click on edit to edit our activity, our form is openedr */}
  //           {/* onClick={() =>openForm()}  if we destrcutered also the openform of the activityStore element of mobx class*/}
  //   <Button as={Link}  to ={`/activities`} basic color='grey' content ='Cancel'/> {/* when we click on the cancel button the selected activity is cancelled and we return as we didnt select any acitivity*/}
  //            {/* onClick={celSelectActivity}  if we destrcutered also the cancelActivity of the activityStore element of mobx class*/}
  //   </Button.Group>

  //   </CardContent>
  // </Card>
  //   )



