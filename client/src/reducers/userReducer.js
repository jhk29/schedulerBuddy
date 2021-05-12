import {
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
  SET_USER_ERROR,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        error: {},
      };
    case USER_LOADING:
      return {
        ...state,
        error: {},
        loading: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        error: {},
      };
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        error: {},
      };
    case SET_USER_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
