import { makeAutoObservable } from "mobx";
interface Modal{
open : boolean;
body : JSX.Element | null;

}



export default class ModalStore {
modal : Modal= {
    open: false,
    body : null 
}

constructor() {
    makeAutoObservable(this);
}

openModal =(content: JSX.Element) => { //the modal is taking as a parameter the content of the login form which is of type JSX element, so the content inside this modalshoukd be from this type
this.modal.open = true ;
this.modal.body = content ; 


}  //it is the content that is located in our modal of type jsx element bcx the login method is of type jsx

closeModal = ()=>{
    this.modal.open=false;
    this.modal.body = null;
}

}