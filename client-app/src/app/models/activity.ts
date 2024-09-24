export interface Activity {
    id: string
    title: string
    date: Date | null //putting ou date into a date object not a string 
    description: string
    category: string
    city: string
    venue: string
  }
  