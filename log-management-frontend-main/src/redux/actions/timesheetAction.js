import axios from "axios";
import {
  CHECK_IN_LOADING,
  CHECK_IN_SUCCESS,
  CHECK_IN_ERROR,
  CHECK_OUT_LOADING,
  CHECK_OUT_SUCCESS,
  CHECK_OUT_ERROR,
  TIMELOGS_LOADING,
  TIMELOGS_TODAY_SUCCESS,
  TIMELOGS_WEEK_SUCCESS,
  TIMELOGS_MONTH_SUCCESS,
  TIMELOGS_ERROR,
  UPDATE_HOURS_LOADING,
  UPDATE_HOURS_SUCCESS,
  UPDATE_HOURS_ERROR,
  EMPLOYEE_LIST_TIMELOGS_SUCCESS,
  EMPLOYEE_CREATE_TIMELOGS_SUCCESS,
  EMPLOYEE_UPDATE_TIMELOGS_SUCCESS,
  EMPLOYEE_UPDATE_HOURS_SUCCESS,
  EMPLOYEE_DELETE_TIMELOG_SUCCESS,
} from "./types";
import { getCurrentHost, throwError } from "./../constants/index";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";

//Error functio

// list timelogs of today
export const listTimeLogs = () => async (dispatch) => {
  dispatch({
    type: TIMELOGS_LOADING,
  });
  axios
    .get(getCurrentHost() + "timesheet/list", {
      headers: authHeader(true),
    })
    .then((response) => {
      //console.log('response', response);
      if (response?.data) {
        dispatch({ type: TIMELOGS_TODAY_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: TIMELOGS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: TIMELOGS_ERROR, payload: error });
    });
};

// list timelogs of one week
export const listTimeLogsOfWeek = () => async (dispatch) => {
  dispatch({
    type: TIMELOGS_LOADING,
  });
  axios
    .get(getCurrentHost() + "timesheet/list/week", {
      headers: authHeader(true),
    })
    .then((response) => {
      //console.log('response', response);
      if (response?.data) {
        dispatch({ type: TIMELOGS_WEEK_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: TIMELOGS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: TIMELOGS_ERROR, payload: error });
    });
};

// list timelogs of one week
export const listTimeLogsOfMonth = (data) => async (dispatch) => {
  dispatch({
    type: TIMELOGS_LOADING,
  });
  axios
    .get(getCurrentHost() + `timesheet/list/${data.month}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      //console.log('response', response);
      if (response?.data) {
        dispatch({ type: TIMELOGS_MONTH_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: TIMELOGS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: TIMELOGS_ERROR, payload: error });
    });
};

// Check-in in timesheet
export const checkIN = (data) => async (dispatch) => {
  dispatch({
    type: CHECK_IN_LOADING,
  });
  axios
    .post(getCurrentHost() + "timesheet/check-in", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      //console.log('response', response);
      if (response?.data) {
        dispatch({ type: CHECK_IN_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: CHECK_IN_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: CHECK_IN_ERROR, payload: error });
    });
};

// Check-out in timesheet
export const checkOUT = (data) => async (dispatch) => {
  dispatch({
    type: CHECK_OUT_LOADING,
  });
  axios
    .put(getCurrentHost() + "timesheet/check-out", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      //console.log('response', response);
      if (response?.data) {
        dispatch({ type: CHECK_OUT_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: CHECK_OUT_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: CHECK_OUT_ERROR, payload: error });
    });
};

// Update total hours
export const updateHours = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_HOURS_LOADING,
  });
  axios
    .put(getCurrentHost() + "timesheet/hours", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      // console.log('response', response);
      if (response?.data) {
        dispatch({ type: UPDATE_HOURS_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: UPDATE_HOURS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: UPDATE_HOURS_ERROR, payload: error });
    });
};

// Timesheet actions for the employee by HR/Sup/Admin
export const listEmpTimelogs = (data) => async (dispatch) => {
  dispatch({
    type: TIMELOGS_LOADING,
  });
  axios
    .get(getCurrentHost() + `timesheet/list/${data.user_id}/${data.duration}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      //console.log('response', response);
      if (response?.data) {
        dispatch({
          type: EMPLOYEE_LIST_TIMELOGS_SUCCESS,
          payload: response.data,
        });
      } else {
        throwError(response);
        dispatch({ type: TIMELOGS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: TIMELOGS_ERROR, payload: error });
    });
};
export const createEmpTimelogs = (data) => async (dispatch) => {
  dispatch({
    type: TIMELOGS_LOADING,
  });
  axios
    .post(getCurrentHost() + `timesheet/create/${data.user_id}`, data, {
      headers: authHeader(true),
    })
    .then((response) => {
      //console.log('response', response);
      if (response?.data) {
        dispatch({
          type: EMPLOYEE_CREATE_TIMELOGS_SUCCESS,
          payload: response.data,
        });
      } else {
        throwError(response);
        dispatch({ type: TIMELOGS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: TIMELOGS_ERROR, payload: error });
    });
};
export const updateEmpTimelogs = (data) => async (dispatch) => {
  dispatch({
    type: TIMELOGS_LOADING,
  });
  axios
    .put(getCurrentHost() + `timesheet/update/${data.user_id}`, data, {
      headers: authHeader(true),
    })
    .then((response) => {
      //console.log('response', response);
      if (response?.data) {
        dispatch({
          type: EMPLOYEE_UPDATE_TIMELOGS_SUCCESS,
          payload: response.data,
        });
      } else {
        throwError(response);
        dispatch({ type: TIMELOGS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: TIMELOGS_ERROR, payload: error });
    });
};
export const updateEmpHours = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_HOURS_LOADING,
  });
  axios
    .put(getCurrentHost() + `timesheet/hours/${data.user_id}`, data, {
      headers: authHeader(true),
    })
    .then((response) => {
      // console.log('response', response);
      if (response?.data) {
        dispatch({
          type: EMPLOYEE_UPDATE_HOURS_SUCCESS,
          payload: response.data,
        });
      } else {
        throwError(response);
        dispatch({ type: UPDATE_HOURS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: UPDATE_HOURS_ERROR, payload: error });
    });
};

export const deleteEmpTimelog = (data) => async (dispatch) => {
  dispatch({
    type: TIMELOGS_LOADING,
  });
  axios
    .delete(getCurrentHost() + `timesheet/delete/${data.id}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response?.data) {
        dispatch({
          type: EMPLOYEE_DELETE_TIMELOG_SUCCESS,
          payload: response.data,
        });
      } else {
        throwError(response);
        dispatch({ type: TIMELOGS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: TIMELOGS_ERROR, payload: error });
    });
};

export const markEmpAbsent = (data) => async (dispatch) => {
  dispatch({
    type: TIMELOGS_LOADING,
  });
  axios
    .delete(
      getCurrentHost() + `timesheet/mark-absent/${data.date}/${data.user_id}`,
      {
        headers: authHeader(true),
      }
    )
    .then((response) => {
      if (response?.data) {
        dispatch({
          type: EMPLOYEE_DELETE_TIMELOG_SUCCESS,
          payload: response.data,
        });
      } else {
        throwError(response);
        dispatch({ type: TIMELOGS_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      throwError(error.response);
      console.log("error", error?.response);
      dispatch({ type: TIMELOGS_ERROR, payload: error });
    });
};
