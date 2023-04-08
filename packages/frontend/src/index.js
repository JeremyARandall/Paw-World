import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';
//import { legacy_createStore as createStore } from 'redux'
import { StoreProvider } from "./Store";

/*import { Provider } from "react-redux";
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'; */

import App from './App';


//const store = createStore(reducers, compose(applyMiddleware(thunk)));
//const root = createRoot(container);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
