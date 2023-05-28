import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";
//Redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import favReducer from './features/favourite';
import cartReducer from './features/cart';

const store = configureStore({
  reducer : {
    favourite : favReducer,
    cart : cartReducer,
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
