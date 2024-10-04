import { User } from "./user";

//this are the information about each attendee in the horizomtal attendee list of each activity
export interface IProfile{
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    followingCount : number ;
    followersCount : number ;
    following: boolean ;
    photos?: Photo[]
}

export class Profile implements IProfile{


username: string;
displayName: string;
image?: string;
bio?: string;
followingCount = 0 ;
followersCount = 0 ;
following= false ;
photos?: Photo[]

    constructor(user : User) {

        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;    
        


    }

 

}

export interface Photo {
    id : string ;
    url : string ;
    isMain: boolean;


}