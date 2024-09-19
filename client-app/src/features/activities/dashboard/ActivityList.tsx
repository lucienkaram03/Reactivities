import { observer } from "mobx-react-lite";


import { Fragment } from "react/jsx-runtime";
import { Header, Item } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

//interface Props {
    //activities : Activity[] ;
   // selectActivity : (id : string ) => void;
   // deleteActivity:(id : string ) => void;
    //submitting: boolean;
    
//}

export default observer( function ActivityList( /*{activities,deleteActivity,submitting} : Props*/) {
    const{activityStore} = useStore() ;
    const{groupedActivities} = activityStore; 

return (
   <>

   {groupedActivities.map(([group, activities]) => ( //group represent the date of the activity, here we are looping inside the activities array, we are doing the work of groupedActivities for each element in the activities.
    <Fragment key={group} >
         <Header sub color ='teal' >
            {group}
         </Header>
         
    {/* now its just like a for loop for each activity in the activities list, where we are styling each element in the list */}
    {activities.map(activity => (   
        <Item key={activity.id} >
            <ActivityListItem key={activity.id} activity={activity} /> {/* <ActivityListItem activity={activity}  take the activity from the props that is the parameter of this function and assign it to the activity parameter.*/} 
        </Item>
    ))}

    </Fragment>
   ) )}
   </>





)








//  const [target , setTarget] = useState(' ')// this state will contain the name of the button
//  function handleActivityDelete(e :SyntheticEvent<HTMLButtonElement>, id : string) { //e is the event that we are retreiving from the button
//   setTarget(e.currentTarget.name) ;  //targeting the name of the event and then deleting it 
//   deleteActivity(id) ; //and then deleting it 
//  }
 
 

   


})
