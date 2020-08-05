import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import promReducer from "./reducers/promReducer";

const reducer = combineReducers({
  auth: authReducer,
  promociones: promReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
