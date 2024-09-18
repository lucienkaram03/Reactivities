import { createContext, useContext } from "react";
import ActivityStore from "./activityStore.ts";

interface Store {
 
  activityStore : ActivityStore //this is the list of activities that we are goanna store in our activity store.

}

export const store : Store = { //creating a big store of interface store.
    activityStore : new ActivityStore()  // we created a new activity store inside this store.it is like feeding this big store with activitiy properties.
}

export const StoreContext = createContext(store) ; //creating a react context for this store, the context that will let us get the properties needed for the component.
 
export function useStore() {
    return useContext(StoreContext) ; //this function allow our components to use our stores
}