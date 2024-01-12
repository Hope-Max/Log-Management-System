import axios from "axios";
import {
  SHIFT_DELETE_ERROR,
  SHIFT_DELETE_LOADING,
  SHIFT_DELETE_SUCCESS,
  SHIFT_DATE_DELETE_SUCCESS,
} from "./types";
import { getCurrentHost, throwError } from "../constants/index";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Shift create
export const deleteShift = (data) => async (dispatch) => {
  dispatch({ type: SHIFT_DELETE_LOADING });
  axios
    .post(getCurrentHost() + "remove-shift", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data.status) {
        dispatch({ type: SHIFT_DELETE_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: SHIFT_DELETE_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      dispatch({ type: SHIFT_DELETE_ERROR, payload: error.response });
    });
};

// Shift Delete
export const deleteDateShifts = (data) => async (dispatch) => {
  dispatch({ type: SHIFT_DELETE_LOADING });
  axios
    .post(getCurrentHost() + "remove-shift-date", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data.status) {
        dispatch({ type: SHIFT_DATE_DELETE_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: SHIFT_DELETE_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      dispatch({ type: SHIFT_DELETE_ERROR, payload: error.response });
    });
};
