import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default function ActivityFilters() {
    const{activityStore : {predicate , setPredicate}} = useStore() ;
    return(
    <>
    
    <Menu vertical size='large' style={{width: '100%' , marginTop: 25} }>
        <Header icon ='filter' attached color= "teal" content='Filters' />
        <Menu.Item
         content ='All Activities'
         active = {predicate.has('all')} //activating the filter
         onClick= {() => setPredicate('all', 'true')} /> {/* making now our filters really works */}
        <Menu.Item 
        content = "I'm going" 
        active = {predicate.has('isGoing')}
         onClick= {() => setPredicate('isGoing', 'true')}/>
        <Menu.Item content ="I'm hosting"
        active = {predicate.has('isHost')}
        onClick= {() => setPredicate('isHost', 'true')} />
    </Menu>
    <Header />
    <Calendar 
    onChange={(date) => setPredicate('startDate' , date as Date)}
    value={predicate.get('startDate') || new Date()} 

    
    />
    </>

    )
}