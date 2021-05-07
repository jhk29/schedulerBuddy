import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  todo: todoReducer,
});
