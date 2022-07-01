import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
      domain="dev-3vw1v-mi.us.auth0.com" 
      clientId="izMClAVP0WT9j2hztG6y1autrP9xr21o" 
      redirectUri={window.location.origin}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
