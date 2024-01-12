import axios from "axios";
import {
  ATTENDANCE_LOADING,
  USERS_ATTENDANCE_SUCCESS,
  ATTENDANCE_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
} from "./types";
import { getCurrentHost, throwError } from "../constants";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";

export const getAllUsersAttendance = (data) => async (dispatch) => {
  dispatch({ type: SHOW_LOADER, payload: {} });
  dispatch({ type: ATTENDANCE_LOADING });
  axios
    .post(getCurrentHost() + "users/monthly-attendance", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: HIDE_LOADER, payload: {} });
        dispatch({ type: USERS_ATTENDANCE_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: ATTENDANCE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: ATTENDANCE_ERROR, payload: err.response.data });
    });
};
