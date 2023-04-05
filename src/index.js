import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "react-auth-kit";
import {ContextProvider} from './Context/ContextProvider';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from'react-redux';
import LoginReducer from "./Redux/loginSlice"


const store = configureStore({
  reducer:{
    login:LoginReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
    <ContextProvider>
      <SnackbarProvider>
        <AuthProvider
          authType="cookie"
          authName="_auth"
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </ContextProvider>
    </Provider>
  </React.StrictMode>
);