export interface User{ //this is the model of the user that we get from our API
    username : string;
    displayName: string;
    token : string;
    image? :string;
}

export interface UserFormValues{ //used for the login and registration

    email: string ;
    password : string;
    displayName?: string;
    username?: string ; 

}