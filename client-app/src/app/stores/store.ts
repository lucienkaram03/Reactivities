import { createContext, useContext } from "react";
import ActivityStore from "./activityStore.ts";
import CommonStore from "./commonStore.ts";
import UserStore from "./userStore.ts";

import ModalStore from "./modalStore.ts";
import ProfileStore from "./ProfileStore.ts";


interface Store {
 
  activityStore : ActivityStore //this is the list of activities that we are goanna store in our activity store.
commonStore : CommonStore ; //we we store the rror for our server error
userStore : UserStore;
modalStore : ModalStore;
profileStore : ProfileStore;
}

export const store : Store = { //creating a big store of interface store.
    activityStore : new ActivityStore(),  // we created a new activity store inside this store.it is like feeding this big store with activitiy properties.
    commonStore : new CommonStore(), //this is where we store our error when we went it back from our API
    userStore : new UserStore(),
    modalStore:new ModalStore(),
    profileStore : new ProfileStore()
}

export const StoreContext = createContext(store) ; //creating a react context for this store, the context that will let us get the properties needed for the component.
 
export function useStore() {
    return useContext(StoreContext) ; //this function allow our components to use our stores
}