import {
  EVENT_LOADING,
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_TODAYS_EVENTS,
  UPDATE_DASHBOARD_EVENT,
  ADD_DASHBOARD_EVENT,
} from "../actions/types";
import moment from "moment";

const initialState = {
  events: [],
  event: {},
  loading: false,
};

export default function eventReducer(state = initialState, action) {
  const today = moment().startOf("day").toISOString().substring(0, 10);

  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.events,
        loading: false,
      };
    case GET_TODAYS_EVENTS:
      return {
        ...state,
        events: action.events,
        loading: false,
      };
    case EVENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) => {
          if (event._id === action.event._id) {
            return action.event;
          }
          return event;
        }),
      };
    case UPDATE_DASHBOARD_EVENT:
      if (action.event.start.substring(0, 10) !== today) {
        return {
          ...state,
          events: state.events.filter(
            (event) => event._id !== action.event._id
          ),
        };
      }
      return {
        ...state,
        events: state.events.map((event) => {
          if (event._id === action.event._id) {
            return action.event;
          }
          return event;
        }),
      };
    case ADD_DASHBOARD_EVENT:
      state.events = [action.event, ...state.events];
      return {
        ...state,
        events: state.events.filter(
          (event) => event.start.substring(0, 10) === today
        ),
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [action.event, ...state.events],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };
    default:
      return state;
  }
}
