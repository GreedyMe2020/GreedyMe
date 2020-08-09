import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import promReducer from "./reducers/promReducer";
import {
  firestoreReducer,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import {
  firebaseReducer,
  reactReduxFirebase,
  getFirebase,
} from "react-redux-firebase";
import config from "../firebase/config";

const reducer = combineReducers({
  auth: authReducer,
  promociones: promReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(config), // redux binding for firebase
    reduxFirestore(config) // redux bindings for firestore
  )
);

export default store;
