import '.app/layout/styles.css';
import { StrictMode } from 'react';
import 'react-calendar/dist/Calendar.css';
import { createRoot } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'; // importing the reference of our semantic design for our app
import { store, StoreContext } from './app/stores/store';

import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}> {/* giving our app information that it should retreive properties from this store. */}
     {/*<App /> : this is my app.tsx, we also call a component like this line of code*/}
     <RouterProvider router = {router} /> {/* we need to provide our route to our application. so we will use router provider, here it takes the place of our app */}
    </StoreContext.Provider>
    
  </StrictMode>,
)
