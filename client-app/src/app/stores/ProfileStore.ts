import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/profile";
import { store } from "./store";


export default class

ProfileStore {
    profile : Profile | null = null ;
    loadingProfile = false; 
    uploading = false;
    loading = false;
    followings : Profile[] = [] ;
    loadingFollowings =false ;
    activeTab=0;

    constructor () {
        makeAutoObservable(this) ; //typical mobx

        reaction (
            () => this.activeTab, 
            activeTab => {
                if(activeTab == 3 || activeTab == 4)  {
                    const predicate = activeTab ===3 ? 'followers' : 'following' ;
                    this.loadFollowings(predicate) ; //load followings or followers based on the predicate.
                } else {
                    this.followings = [] ;
                }
            }
        )
    }
setActiveTab = (activeTab : number) => {
    this.activeTab = activeTab ;
}


    
    get isCurrentUser () {

        if(store.userStore.user && this.profile ) { //We want to check if the profile loaded is the current user 
            return store.userStore.user.username === this.profile.username ;  //this is our current user
        }
        return false;
    }

    //implememting the actions here

    loadProfile = async (username : string ) => { //lamda function directly link to the properties above

        this.loadingProfile = true ;
        try{
            const profile = await agent.Profiles.get(username) ; //getting the profile data knowing the username of the user
            runInAction(() => {
                this.profile = profile; //the one fetched
                this.loadingProfile = false;
        })

        } catch(error) {
            console.log(error) ;
            runInAction(() => this.loadingProfile = false ) ;
        }

    }
    uploadPhoto = async (file : Blob) => { //this our upload photo method linked with our API that we will retreive from our PhotoStore
        this.uploading = true ;
    
    try {

        const response = await agent.Profiles.uploadPhoto(file) ; //uploading the file given as a parameter to our profile
        const photo = response.data;  //the photo is the data  of our response
        runInAction(() => {
            if (this.profile) {  //chechk if we got a profile
                this.profile.photos?.push(photo); //addimg the photo into the collection of this profile
                if(photo.isMain && store.userStore.user) {
                    store.userStore.setImage(photo.url) ; //if our photo is the main one , we will set it as a profile image for our user
                    this.profile.image = photo.url;
                }
            }
        })
        
    } catch (error) {
        console.log(error) ;
        runInAction(() => this.uploading = false) ;
        
    }
}
steMainPhoto = async (photo : Photo) => {
    this.loading = true ;
    try {
        await agent.Profiles.setMainPhoto(photo.id);
        store.userStore.setImage(photo.url);
        runInAction(() => {
            if(this.profile && this.profile.photos) {
                this.profile.photos.find(p => p.isMain)!.isMain=false; //removing our old main photo 
                this.profile.photos.find(p => p.id === photo.id)!.isMain=true; //going over our photo array and get from it the photo with the required id
                this.profile.image = photo.url; //profile image will be this photo
                this.loading = false; 


            }
            

        })
        
    } catch (error) {
        console.log(error);
        runInAction(() => this.loading=false);
        
    }
}

deletephoto = async(photo : Photo) => {
    this.loading =true ; 
    try {
        await agent.Profiles.deletePhoto(photo.id);
        runInAction(() => {
            if (this.profile) {
                this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id); //creating a new array without the photo with this specific id
                this.loading = false;
            }
        } )

        
    } catch (error) {
        console.log(error);
        runInAction(() => this.loading = false) ;
    }


}

updateFollowing = async (username : string , following : boolean) => { //  this property is what are we going  to set the following to?

   
    this.loading = true ;
    try {
        await agent.Profiles.updateFollowing(username); //username that we wang to follow
        store.activityStore.updateAttendeeFollowing(username) ;
        runInAction(() => {
            if(this.profile && this.profile.username !== store.userStore.user?.username && this.profile.username == username) { //update following when the current logged in user is different from the one we are attempting to follow
                if(following) this.profile.followersCount ++ ;  
                    
                else this.profile.followersCount-- ;

                this.profile.following =! this.profile.following ;
            }

            if(this.profile && this.profile.username == store.userStore.user?.username) 
            {
                if(following) this.profile.followersCount ++ ;  
                    
                else this.profile.followersCount-- ;
            }
            


            this.followings.forEach(profile => { //this is the profile of the attendee that we want to follow
                if(profile.username === username) //the one that we want to follow
                {
                    if(profile.following) //if we already follows  this profile  
                          profile.followersCount -- ;
                        else profile.followersCount++ ; 
                        profile.following =! profile.following ;

                }
            })
            this.loading = false ;





        }   )
        
    } catch (error) {

        console.log(error) ;
        runInAction(() => this.loading = false)
        
    }



}

loadFollowings = async (predicate : string) => {
    this.loadingFollowings = true ;
    try {
        const followings = await agent.Profiles.listFollowings(this.profile!.username , predicate) ; //getting the list of followings from our API
        runInAction(() => {
            this.followings = followings;
            this.loadingFollowings= false ;
        })
        
    } catch (error) {
        console.log(error);
        runInAction(() => this.loadingFollowings=false)  ;
        
    }
}


}