import { StrictMode } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css'; //styling our datepicker
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css'; //styling our notfications
import 'semantic-ui-css/semantic.min.css'; // importing the reference of our semantic design for our app
import './app/layout/styles.css';
import { router } from './app/router/Routes';
import { store, StoreContext } from './app/stores/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}> {/* giving our app information that it should retreive properties from this store. */}
     {/*<App /> : this is my app.tsx, we also call a component like this line of code*/}
     <RouterProvider router = {router} /> {/* we need to provide our route to our application. so we will use router provider, here it takes the place of our app */}
    </StoreContext.Provider>
    
  </StrictMode>,
)
