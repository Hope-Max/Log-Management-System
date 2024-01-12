import axios from "axios";
import { toast } from "react-toastify";
import { authHeader } from "./authHeader";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentHost, throwError } from "../constants/index";
import {
  PAYROLL_LOADING,
  ALL_USERS_PAYROLL_MONTHLY_SUCCESS,
  PAYROLL_MONTHLY_SUCCESS,
  PAYROLL_ERROR,
} from "./types";

// list all users monthly payroll
export const listAll = (data) => async (dispatch) => {
  dispatch({ type: PAYROLL_LOADING });
  axios
    .get(
      getCurrentHost() + `monthly-payroll/list/all/${data.year}/${data.month}`,
      {
        headers: authHeader(true),
      }
    )
    .then((res) => {
      if (res.data) {
        dispatch({
          type: ALL_USERS_PAYROLL_MONTHLY_SUCCESS,
          payload: res.data,
        });
      } else {
        throwError(res);
        dispatch({ type: PAYROLL_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err?.response);
      dispatch({ type: PAYROLL_ERROR, payload: err.response.data });
    });
};

// list user id monthly payroll
export const list = (data) => async (dispatch) => {
  dispatch({ type: PAYROLL_LOADING });
  axios
    .get(
      getCurrentHost() +
        `monthly-payroll/list/${data.id}/${data.year}/${data.month}`,
      {
        headers: authHeader(true),
      }
    )
    .then((res) => {
      if (res.data) {
        dispatch({ type: PAYROLL_MONTHLY_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PAYROLL_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err?.response);
      dispatch({ type: PAYROLL_ERROR, payload: err.response.data });
    });
};
