import axios from "axios";
import { proxy } from "../proxy";
import * as types from "./types";

export function issueUserSuccess(data) {
  return { type: types.ISSUE_USER, payload: data };
}

export function searchUserNameSuccess(data) {
  return { type: types.SEARCH_USER_NAME, payload: data };
}

export function isBookAvailableSuccess() {}

export function getAllUserSuccess(data) {
  return { type: types.GET_ALL_USER, payload: data };
}

export function getAllUsers() {
  return function (dispatch) {
    axios
      .get(`${proxy}/api/v1/user`)
      .then((data) => {
        return dispatch(getAllUserSuccess(data.data.data));
        console.log(data);
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function issueUser(insertData) {
  return function (dispatch) {
    axios
      .post(`${proxy}/api/v1/user`, insertData)
      .then((data) => {
        return dispatch(issueUserSuccess(data.data.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function searchUserName(name) {
  return function (dispatch) {
    axios
      .get(`${proxy}/api/v1/user/${name}`)
      .then((res) => {
        return dispatch(searchUserNameSuccess(res.data.data));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function isBookAvailable() {
  axios
    .get(`${proxy}/api/v1/books`)
    .then((res) => {
      //console.log(res.data.data);
      //   setBookAvsailability(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
