import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'; // importing the reference of our semantic design for our app

import App from './app/layout/App';
import './app/layout/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
