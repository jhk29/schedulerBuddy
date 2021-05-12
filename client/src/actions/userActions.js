import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
  SET_USER_ERROR,
} from "./types";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: SET_USER_ERROR,
        error: err.response.data,
      })
    );
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: SET_USER_ERROR,
        error: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const updatePassword = (userData) => (dispatch) => {
  axios
    .post("/api/users/password", userData)
    .then(() => {
      dispatch({
        type: UPDATE_USER_PASSWORD,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_USER_ERROR,
        error: err.response.data,
      });
    });
};

export const updateUserInfo = (userData) => (dispatch) => {
  axios
    .post("/api/users/update", userData)
    .then((res) =>
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SET_USER_ERROR,
        error: err.response.data,
      })
    );
};

export const deleteUser = () => (dispatch) => {
  axios
    .delete("/api/users")
    .then(() => {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      dispatch(setCurrentUser({}));
    })
    .catch(() =>
      alert("An error occurred while trying to delete user! Please try again.")
    );
};
