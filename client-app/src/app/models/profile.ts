import { User } from "./user";

//this are the information about each attendee in the horizomtal attendee list of each activity
export interface IProfile{
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
}

export class Profile implements IProfile{


 username: string;
displayName: string;
image?: string;
bio?: string;

    constructor(user : User) {

        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;    


    }

 

}