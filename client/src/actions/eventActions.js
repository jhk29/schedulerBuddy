import axios from "axios";
import {
  EVENT_LOADING,
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_TODAYS_EVENTS,
} from "./types";

export const getEvents = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("api/event")
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        events: res.data,
      });
    })
    .catch(() => {
      alert("An error occurred while trying to fetch events!");
    });
};

export const getTodaysEvents = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("api/event/today")
    .then((res) => {
      dispatch({
        type: GET_TODAYS_EVENTS,
        events: res.data,
      });
    })
    .catch(() => {
      alert("An error occurred while trying to fetch events!");
    });
};

export const addEvent = (eventData) => (dispatch) => {
  axios
    .post("/api/event/add", eventData)
    .then((res) => {
      dispatch({
        type: ADD_EVENT,
        event: res.data,
      });
    })
    .catch(() =>
      alert("An error occurred while trying to add an event! Please try again.")
    );
};

export const deleteEvent = (id) => (dispatch) => {
  axios
    .delete(`/api/event/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_EVENT,
        payload: id,
      });
    })
    .catch(() =>
      alert(
        "An error occurred while trying to delete an event! Please try again."
      )
    );
};

export const updateEvent = (id, eventData) => (dispatch) => {
  axios
    .post(`api/event/${id}`, eventData)
    .then((res) =>
      dispatch({
        type: UPDATE_EVENT,
        event: res.data,
      })
    )
    .catch(() =>
      alert(
        "An error occurred while trying to update an event! Please try again."
      )
    );
};

export const setLoading = () => {
  return {
    type: EVENT_LOADING,
  };
};
