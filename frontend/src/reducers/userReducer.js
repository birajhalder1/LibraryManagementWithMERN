import initialState from "./initialState";
import * as types from "../actions/types";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.ISSUE_USER:
      let newState = JSON.parse(JSON.stringify(state)); // another exm ...state
      newState.push(action.payload);
      return newState;
    case types.GET_ALL_USER:
      return action.payload;
    case types.SEARCH_USER_NAME:
      return action.payload;
    default:
      return state;
  }
}

// initialState = {
//   userReducer: {
//     user: [],
//   },
//   bookReducer: {
//     book: [],
//   },
// };
