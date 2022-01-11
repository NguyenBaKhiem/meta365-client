// @ts-nocheck
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import auth from "./account";
import menuReducer from "./menu";
import article from "./article";
import notification from "./notification";
import loading from "./loading";
import market from "./market";
import land from "./land";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account","market", "land"],

};

const allReducers = combineReducers({
  menu: menuReducer,
  account: auth,
  article,
  notification,
  loading,
  market,
  land
});

const persistedReducer = persistReducer(persistConfig, allReducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
export { store, persistor };
