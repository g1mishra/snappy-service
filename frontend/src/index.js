import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import * as serviceWorker from './serviceWorker';


import Storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from "./redux-src/reducers";
import createEncryptor from "redux-persist-transform-encrypt"

//alert
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 10000,
  offset: '60px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

////
const encryptor = createEncryptor({
  secretKey: "don't want to show you",
})
const persistConfig = {
  key: 'root',
  storage: Storage,
  transforms: [encryptor],
}
const persistReducers = persistReducer(persistConfig, allReducers);
export  let store = createStore(persistReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export let persistor = persistStore(store)

ReactDOM.render(
          <AlertProvider template={AlertTemplate} {...options}>
                <Provider store = {store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
            </AlertProvider>, 
                document.getElementById('root')
                );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
