import axios from "axios";
import {
  EXPENSE_ERROR,
  EXPENSE_LOADING,
  ADD_EXPENSE_SUCCESS,
  EXPENSE_LIST_SUCCESS,
  UPDATE_EXPENSE_SUCCESS,
} from "./types";
import { getCurrentHost, throwError } from "../constants/index";
import { authHeader } from "./authHeader";

// Shift create
export const addExpenseAction = (data) => async (dispatch) => {
  dispatch({ type: EXPENSE_LOADING });
  axios
    .post(getCurrentHost() + "expenses/create", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: ADD_EXPENSE_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: EXPENSE_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: EXPENSE_ERROR, payload: error.response });
    });
};

export const listExpenseAction = (data) => async (dispatch) => {
  dispatch({ type: EXPENSE_LOADING });
  axios
    .get(getCurrentHost() + `expenses/${data}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: EXPENSE_LIST_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: EXPENSE_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: EXPENSE_ERROR, payload: error.response });
    });
};

export const updateExpenseAction = (data) => async (dispatch) => {
  dispatch({ type: EXPENSE_LOADING });
  axios
    .put(getCurrentHost() + `expenses/${data?.id}`, data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: UPDATE_EXPENSE_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: EXPENSE_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: EXPENSE_ERROR, payload: error.response });
    });
};
