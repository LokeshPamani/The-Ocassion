import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ConfigureStore from './Redux/store/store';
import { Provider } from "react-redux";
import { checkLoggedIn } from "./util/Session";
import {BrowserRouter} from  'react-router-dom'
// let preloadedState = {};
// const store = ConfigureStore(preloadedState);

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
const renderApp = preloadedState => {
const store = ConfigureStore(preloadedState);
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
  window.getState = store.getState;
};(async () => renderApp(await checkLoggedIn()))();
// FOR TESTING, remove before production
//window.getState = store.getState;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
