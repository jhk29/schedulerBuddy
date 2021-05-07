import {
  EVENT_LOADING,
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
} from "../actions/types";

const initialState = {
  events: [],
  event: {},
  loading: false,
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
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
