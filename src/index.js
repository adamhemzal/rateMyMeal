import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import App from './App';
import "@fontsource/karla/400.css";
import "@fontsource/karla/700.css";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Authenticator.Provider>
        <App />
      </Authenticator.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
