import React from "react";
import ReactDOM from "react-dom";


import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {store, persistor} from "./redux/reducers";
import { PersistGate } from 'redux-persist/integration/react'
import Loading from "./components/LoadingModal";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Loading />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();