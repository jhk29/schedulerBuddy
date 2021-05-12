import { combineReducers } from "redux";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
  auth: userReducer,
  todo: todoReducer,
  event: eventReducer,
});
