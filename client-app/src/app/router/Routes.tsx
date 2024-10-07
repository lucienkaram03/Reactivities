import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/Details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
//import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import ProfilePage from "../../features/profiles/ProfilePage";

import App from "../layout/App";
import RequireAuth from "./RequireAuth";


//this is the react component which will contain our routes.
export const routes: RouteObject[] = [ //This code tells the app: "When a user visits the homepage (/), show them the App component."
 { 

    path : "/" ,  // The path is the URL that the user will visit. Here, the path is /, which means the homepage or root of your application.
    
    //If the user goes to https://yourapp.com/, this route will be matched.
    element: <App />, // on what element we are navigating when visiting this url
    children : [ // these are the chlidrens path that we are visiting when we visit the App.tsx, ftom the app page when can visit these pages
       // {path: '' , element: <HomePage/>},  // localhost:3000

       {element : <RequireAuth /> , children: [ //inusring the security on the client side

         {path: 'activities' , element: <ActivityDashboard/>},// localhost:3000/activivties
        {path: 'activities/:id' , element: <ActivityDetails/>}, //when clicking on the view button. selecting an activity knowing its id ad displaying its details, here id is a route parameter
        {path: 'CreateActivity' , element: <ActivityForm key ="create"/>}, // localhost:3000/createActivity
        {path : 'profiles/:username' , element : <ProfilePage/>}, //this path is used to navigate to the activity form to edit the activity with its id.
       {path : 'errors' , element :<TestErrors  />}, //naivgate to our error page
       {path: 'manage/:id' , element: <ActivityForm key='manage' />},



       ]},
        
       {path : 'not-found' , element :<NotFound  />}, 
       {path: '*' , element: <Navigate replace to = '/not-found' />}, //we mean by star the error happened by a mistake url
       {path : 'server-error' , element :<ServerError />}, 
       
    ]

}
]

//creates a router for your web application using the previously defined routes array, it process the route given to it.
export const router = createBrowserRouter(routes) ;