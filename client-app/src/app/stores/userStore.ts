import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore {

    user : User | null = null ;
    fbLoading = false;

    constructor() {
        makeAutoObservable(this) //making ouu user observable
    }

get isLoggedIn() { //veryfing if a user is already logged in to the app

    return!! this.user; //transforming the result into a boolean

}

login = async (creds : UserFormValues) => { // Login property that take as an argument the email and the password which are our creds

const user = await agent.Account.login(creds) //logging in using these creds
store.commonStore.setToken(user.token) ; //storing our token
runInAction(() => this.user= user) ;// setting the user that we fetched
router.navigate('/activities'); 
//console.log(user) //insuring that we get our user object back from our API knowing its creds
store.modalStore.closeModal() ; //after we logged in, our modal whhich is more interactive is closed

}

register = async (creds : UserFormValues) => { // Login property that take as an argument the email and the password which are our creds

    const user = await agent.Account.register(creds) //logging in using these creds
    store.commonStore.setToken(user.token) ; //storing our token after we get the user back
    runInAction(() => this.user= user) ;// setting the user that we fetched
    router.navigate('/activities'); 
    //console.log(user) //insuring that we get our user object back from our API knowing its creds
    store.modalStore.closeModal() ; //after we register, our modal whhich is more interactive is closed
    

}

logout = () => {

    store.commonStore.setToken(null); //when logging out from udemy, the token disappear
    //localStorage.removeItem('jwt') ; we removed it, because we are apllying it in the automatic reaction when changes to the token happen
    this.user = null; //setting our propeerty of the class above to null after we assigned it to the fetched user when logging in
    router.navigate('/'); // back to home page.
   
}
getUser = async () => {  //we focused on the current user because we are persisting the login of the current  user
 
    try {
        const user = await agent. Account.current() ;
        runInAction( () => this.user = user)

    } catch(error) {
        console.log(error)
    }
}

setImage = (image : string) => {
    if(this.user) this.user.image = image  ;
}

setUserPhoto =(url : string ) => {
    if(this.user) this.user.image = url ; 
}

steDisplayName = (name : string ) => {
    if (this.user) this.user.displayName = name ; 
}

facebookLogin = async (accessToken: string) => {
    try {

        this.fbLoading = true ; 
        const user = await agent.Account.fbLogin(accessToken) ;
       store.commonStore.setToken(user.token) //normal thing after we login 
       
        runInAction(() => {
            this.user = user ; 
            this.fbLoading = false ;
        })

        
        
    } catch (error) {
        console.log(error) ;
        runInAction(() => this.fbLoading = false) ;
        
    }
}


}