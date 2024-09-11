import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
// this file is used to add the extra card in the right of the dashboard created
interface Props{
    activity : Activity;
    cancelSelectActivity: () =>void;
    openForm: (id : string) => void;
}
export default function ActivityDetails({activity, cancelSelectActivity, openForm} : Props) {
    return(
        <Card fluid>
     <Image src={`/assets/categoryImages/${activity.category}.jpg`} />{/* `` are used to add strings inside a JSX element */}
    <CardContent>
      <CardHeader>{activity.title}</CardHeader>
      <CardMeta>
        <span >{activity.date}</span>
      </CardMeta>
      <CardDescription>
        {activity.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
    <Button.Group widths='2'>
    <Button onClick={() => openForm(activity.id)} basic color='blue' content ='Edit' /> {/* when we click on edit to edit our activity, our form is openedr */}
    <Button onClick={cancelSelectActivity} basic color='grey' content ='Cancel'/> {/* when we click on the cancel button the selected activity is cancelled and we return as we didnt select any acitivity*/}
    </Button.Group>

    </CardContent>
  </Card>
    )
}