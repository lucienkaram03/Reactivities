import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
//used to store our data
export default class CommonStore{
    error: ServerError  | null = null ; //intial value =null
    apploaded = false;
    token : string | null = localStorage.getItem('jwt') ; //IF it is found it is set if not it is set to null


constructor() {
    makeAutoObservable(this) ; //this is our observable object.

      reaction( //reaction to really admit the change of our token , giving it to log to the console
        // this reaction i run when the observable object is changed, when logging out for example 
        () => this.token,
        token => {
            if (token) { //if we have a token
                localStorage.setItem('jwt' , token)//storing our token knowing its key if we have it
            } else {
                localStorage.removeItem('jwt') 
            }
        }
      )


}

setServerError(error :ServerError) {
    this.error = error ;   //this is our action.
}

setToken = (token : string | null) => { //saving our token in the storrage
    
    this.token = token;
}

setApploaded = () => {
this.apploaded =true;
}

}