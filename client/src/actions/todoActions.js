import axios from "axios";
import {
  GET_TODOS,
  TODO_LOADING,
  DELETE_TODO,
  UPDATE_TODO,
  SET_TODO_COMPLETE,
  ADD_TODO,
  GET_TODOS_DUE,
} from "./types";

export const getTodos = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("api/todo")
    .then((res) => {
      dispatch({
        type: GET_TODOS,
        todos: res.data,
      });
    })
    .catch(() => {
      alert("An error occurred while trying to fetch to-dos!");
    });
};

export const getTodosDue = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("api/todo/due")
    .then((res) => {
      dispatch({
        type: GET_TODOS_DUE,
        todos: res.data,
      });
    })
    .catch(() => {
      alert("An error occured while trying to fetch to-dos!");
    });
};

export const addTodo = (todoData) => (dispatch) => {
  axios
    .post("/api/todo/add", todoData)
    .then((res) => {
      dispatch({
        type: ADD_TODO,
        todo: res.data,
      });
    })
    .catch(() =>
      alert("An error occurred while trying to add a to-do! Please try again.")
    );
};

export const deleteTodo = (id) => (dispatch) => {
  axios
    .delete(`/api/todo/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
    })
    .catch(() =>
      alert(
        "An error occurred while trying to delete a to-do! Please try again."
      )
    );
};

export const updateTodo = (id, todoData) => (dispatch) => {
  axios
    .post(`api/todo/${id}`, todoData)
    .then((res) =>
      dispatch({
        type: UPDATE_TODO,
        todo: res.data,
      })
    )
    .catch(() =>
      alert(
        "An error occurred while trying to update a to-do! Please try again."
      )
    );
};

export const setCompleted = (id, todoData) => (dispatch) => {
  axios
    .post(`/api/todo/${id}`, todoData)
    .then((res) =>
      dispatch({
        type: SET_TODO_COMPLETE,
        todo: res.data,
      })
    )
    .catch(() =>
      alert(
        "An error occured while to set a to-do's complete field! Please try again."
      )
    );
};

export const setLoading = () => {
  return {
    type: TODO_LOADING,
  };
};
