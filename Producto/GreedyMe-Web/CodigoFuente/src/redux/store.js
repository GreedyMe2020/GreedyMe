import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import promReducer from "./reducers/promReducer";
import comReducer from "./reducers/comReducer";
import adminReducer from "./reducers/adminReducer";
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
  comercio: comReducer,
  admin: adminReducer,
});
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(config, {
      attachAuthIsReady: true,
      useFirestoreForProfile: true,
      userProfile: "usuarioComercio",
    }), // redux binding for firebase
    reduxFirestore(config) // redux bindings for firestore
  )
);

export default store;
