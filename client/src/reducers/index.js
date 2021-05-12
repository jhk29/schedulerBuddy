import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
  auth: userReducer,
  errors: errorReducer,
  todo: todoReducer,
  event: eventReducer,
});
