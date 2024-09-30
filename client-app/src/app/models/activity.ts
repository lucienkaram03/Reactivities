import { Profile } from "./profile"

export interface IActivity {
    id: string
    title: string
    date: Date | null //putting ou date into a date object not a string 
    description: string
    category: string
    city: string
    venue: string
    hostUsername?: string;
    isCancelled: boolean;
    attendees?: Profile [];
    host?: Profile;
    isHost:boolean;
    isGoing:boolean;
    
}
  export class Activity implements IActivity {

    id: string
    title: string
    date: Date | null //putting ou date into a date object not a string 
    description: string
    category: string
    city: string
    venue: string
    hostUsername?: string;
    isCancelled: boolean = false
    attendees?: Profile [];
    host?: Profile;
    isHost:boolean =false
    isGoing:boolean = false

    constructor(init: ActivityFormValues) {

      this.id = init.id!
      this.title =init.title
      this.city = init.city
      this.category = init.category
      this.description = init.description
      this.venue = init.venue
      this.date = init.date


    }
    





    
  }

  export class ActivityFormValues {//this one is for creating an activity and creating an attendee list for it
id?: string = undefined;
title: string = ' ';
category: string = ' ';
description: string = ' '; //those are the properties needed in our form
date: Date | null = null;
city: string = ' ';
venue: string = ' ';

constructor(activity?: ActivityFormValues) { //activity optional bcz this is for creating or updating an activity
if(activity) { //if actvivty exist, we will update it
  this.id = activity.id;
  this.title=activity.title;
  this.category=activity.category;
  this.city=activity.city;
  this.venue=activity.venue;
  this.date=activity.date;
  this.description=activity.description;
}

}


  }
  