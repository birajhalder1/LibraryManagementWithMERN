import initialState from "./initialState";
import * as types from "../actions/types";

export default function bookReducer(state = initialState.book, action) {
  switch (action.type) {
    case types.ISSUE_BOOK:
      let newState = JSON.parse(JSON.stringify(state));
      newState.push(action.payload);
      return newState;

    case types.GET_ALL_BOOKS:
      return state.concat(action.payload);
    // initialState.book = [...initialState.book, action.payload];
    // return action.payload;

    default:
      return state;
  }
}

// let x = arr1[];
// let y = x;
// y.push(something)
// let y = [...x];

// let book = arr[]
// let res = [...book]
