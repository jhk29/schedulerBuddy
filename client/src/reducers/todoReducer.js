import {
  TODO_LOADING,
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SET_TODO_COMPLETE,
} from "../actions/types";

const initialState = {
  todos: [],
  todo: {},
  loading: false,
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.todos,
        loading: false,
      };
    case TODO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.todo._id) {
            return action.todo;
          }
          return todo;
        }),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [action.todo, ...state.todos],
      };
    case SET_TODO_COMPLETE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.todo._id) {
            return action.todo;
          }
          return todo;
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    default:
      return state;
  }
}
