import axios from "axios";
import { proxy } from "../proxy";
import * as types from "./types";

export function issueBookSuccess(data) {
  return { type: types.ISSUE_BOOK, payload: data };
}
export function getAllBookSuccess(data) {
  return { type: types.GET_ALL_BOOKS, payload: data };
}
export function issueBook(inserBookData) {
  return function (dispatch) {
    axios
      .post(`${proxy}/api/v1/books`, inserBookData)
      .then((res) => {
        return dispatch(issueBookSuccess(res.data.data));
      })
      .catch((err) => {
        throw err;
      });
  };
}

// Redux hooks action call
export function getAllBooks() {
  return function (dispatch) {
    axios.get(`${proxy}/api/v1/books`).then((res) => {
      return dispatch(getAllBookSuccess(res.data.data));
    });
  };
}
