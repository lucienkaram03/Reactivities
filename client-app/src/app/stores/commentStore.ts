import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
    comments : ChatComment[] = [];
    hubConnection: HubConnection | null = null ;

    constructor() {
        makeAutoObservable(this) ;
    }

    createHubConnection = (activityId : string) => {  //the Id of the activity where we write comments

        if(store.activityStore.selectedActivity) { //if our store of activities is not empty

            this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat?activityId='+ activityId, {
                accessTokenFactory:() => store.userStore.user?.token as string  // getting our requests and response (comment sending) via user Tokens
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build() ;

            this.hubConnection.start().catch(error => console.log('Error establishing the connection', error)) ;

            this.hubConnection.on('LoadComments', (comments : ChatComment[]) => {

                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z'); //adding the utc date as we want
                    })
                
                this.comments = comments
             });
            }) //getting the list of comments of the activity

            this.hubConnection.on('ReceiveComment', (comment : ChatComment) => { //getting back our comment.
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt); 

                    this.comments.unshift(comment); //this is the client receive of the comment

                });
            } ) 

  


        }

    }
    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection:' , error))
    }

clearComments = () => { //clearing after the user disconnet from the signalR hub, all the comments will be loss
    this.comments= [];
    this.stopHubConnection() ;
}

addComment = async (values : {body : string , activityId? : string}) => { //method to let the client add a comment , values are what we are sending to our server
    values.activityId = store.activityStore.selectedActivity?.id; // where are we sending the comment
    try {
        await this.hubConnection?.invoke('SendComment' , values) ; 
        
    } catch (error) {
        console.log(error)
        
    }


}

}