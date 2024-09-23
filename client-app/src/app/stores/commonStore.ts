import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";
//used to store our data
export default class CommonStore{
    error: ServerError  | null = null ; //intial value =null


constructor() {
    makeAutoObservable(this) ; //this is our observable object.
}

setServerError(error :ServerError) {
    this.error = error ;   //this is our action.
}

}