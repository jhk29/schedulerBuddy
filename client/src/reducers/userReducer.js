import {
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
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
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER:
      if (action.error) {
        return {
          ...state,
          error: action.error,
        };
      }
      return {
        ...state,
        user: action.payload,
        error: {},
      };
    case UPDATE_USER_PASSWORD:
      if (action.error) {
        return {
          ...state,
          error: action.error,
        };
      }
      return {
        ...state,
        error: {},
      };
    default:
      return state;
  }
}
