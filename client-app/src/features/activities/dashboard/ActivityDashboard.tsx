import { Grid, Loader } from 'semantic-ui-react';

import { useEffect, useState } from 'react';

import { useStore } from "../../../app/stores/store";

import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroller';
import { PagingParams } from '../../../app/models/pagination';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';

import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

//ACTIVITY DASHBOARD IS THE HOLE BODY CONTENT OF THE WEB APPLICATION THAT CONTAIN EVERYTHING: LIST , DETAILS, FORMS, BUTTONS
//interface Props {
    //activities: Activity[] ;
   // selectedActivity: Activity | undefined;
    //selectActivity : (id : string ) => void; //it returns nothing 
    //cancelSelectActivity: () =>void;
   // editMode: boolean;
    //openForm: (id : string) => void;
    //closeForm:() => void;
    //createorEdit:(activity : Activity) => void;
    //deleteActivity : (id : string) => void;
    //submitting : boolean;

//}
export default observer(function ActivityDashboard(/*{activities, /*selectedActivity, */ /*submitting,*/
   /* selectActivity, cancelSelectActivity */ /*editMode*/ /*openForm,closeForm*/ /*createorEdit*/ /*deleteActivity } : Props*/) { 

    

    const {activityStore} = useStore ();
    const{loadActivities, activityRegistry , setPagingParams , pagination} = activityStore; //destructiuring the edit mode and selected activity from the activityStore mobx class, like we are retreiving them , to make them easy to use
    const[loadingNext , setLoadingNext ] = useState(false) ;


function handleGetNext()  { //this one is used to made a vertical paging. we are working on the sequence of the page

  setLoadingNext(true) ;
  setPagingParams(new PagingParams(pagination!.currentPage + 1))
  loadActivities().then(() => setLoadingNext(false)) ;

}

    useEffect(() => {
      if(activityRegistry.size <=1) loadActivities(); //thus, we dont need to go to our API, as our activity registry is not empty, so we dont have a loading initial
    }, [activityRegistry.size, loadActivities])
   

    
    return (
          <Grid>
            <Grid.Column width='10'>
              {activityStore.loadingInitial && activityRegistry.size === 0  && !loadingNext ? (
                <>
                <ActivityListItemPlaceholder />
                <ActivityListItemPlaceholder />

                </>
              ) : ( //else where we are not loading initial and we are loading the next pach of activities, we infinite scroll

                <InfiniteScroll
pageStart={0}
loadMore={handleGetNext}
hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
initialLoad={false}
>

<ActivityList />

</InfiniteScroll>



              )} 


          {/* <List>
        {props.activities.map((activity) => ( //we are getting each activitiy from the activities that we fetched from setActivities and displayiong its title
        //then our activity is not any more of type any but of type Activity Array
          <List.Item key={activity.id}>
            {activity.title} 
          </List.Item>
        ))}
      </List>*/}  
 
   

   



{/* <Button 
floated='right' 
content='More ...'
positive 
onClick={handleGetNext}
loading={loadingNext}
disabled={pagination?.totalPages === pagination?.currentPage} // getting more and more actvivties while cliking on the button 
/> */}




            </Grid.Column>
            <Grid.Column width ='6'>


              <ActivityFilters />
              
            </Grid.Column>
            <Grid.Column width={10} >
              <Loader active={loadingNext} /> {/* small circle of load when we are scrolling  */}
            </Grid.Column>




          </Grid>
    )

})


// we removed this one because we want the card on the right hand side to desappear.


//  {selectedActivity && !editMode 
//&& <ActivityDetails  //this !editMode  will remove activity details when we are in editing, thats what Neil wants
// activity = {selectedActivity} 
 //cancelSelectActivity={activityStore.cancelSelectActivity()}
 //openForm={activityStore.openForm()} 

 ///> }{/*So what I'll do is I'll just hard code in one of the activities and we'll just access the activity index of zero just so that we've got something to look at in our component. && is used to verify that our activties element exist*/}
 //{/* we want to create a card and present the details of our selected activity, so it have to be present in the ActivtyDetails */}
 //{editMode &&
//<ActivityForm /*closeForm={closeForm} activity={selectedActivity}*/ /*createorEdit={createorEdit}*/ /*submitting={submitting} *//>} {/* when we are in edit mode we want to display our activity so we put &&editmode with activty={selectedactivity} */}
                                                                  /* the submitting is removed because we have got our loading edicator on the store class */                             