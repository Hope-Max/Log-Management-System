import axios from "axios";
import {
  CREATE_LEAVE_QUOTA_SUCCESS,
  LEAVE_QUOTA_LIST_SUCCESS,
  LEAVE_LIST_SUCCESS,
  CREATE_LEAVE_REQUEST_SUCCESS,
  UPDATE_LEAVE_REQUEST_SUCCESS,
  LEAVE_REQUESTS_LIST_SUCCESS,
  CREATE_HOLIDAYS_SUCCESS,
  HOLIDAYS_LIST_SUCCESS,
  DELETE_HOLIDAYS_SUCCESS,
  LEAVE_TYPE_SUCCESS,
  LEAVE_LOADING,
  LEAVE_SUCCESS,
  LEAVE_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
} from "./types";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentHost, isEmpty, throwError } from "../constants/index";

// Open shifts list
export const createLeaveQuotaAction = (data) => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  axios
    .post(getCurrentHost() + "leave-quota/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CREATE_LEAVE_QUOTA_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err.response.data });
    });
};

export const createLeaveRequestAction = (data) => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  axios
    .post(getCurrentHost() + "leave-requests/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CREATE_LEAVE_REQUEST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err.response.data });
    });
};

export const updateLeaveRequestAction = (data) => async (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  dispatch({ type: LEAVE_LOADING });
  axios
    .put(getCurrentHost() + `leave-requests/action/${data.id}`, data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: HIDE_LOADER });
        dispatch({ type: UPDATE_LEAVE_REQUEST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: LEAVE_ERROR, payload: err.response.data });
    });
};

export const leaveListAction = () => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  axios
    .get(getCurrentHost() + "leave-requests/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: LEAVE_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err?.response?.data });
    });
};

export const leaveRequestsListAction = () => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  axios
    .get(getCurrentHost() + "manage/leave-requests", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: LEAVE_REQUESTS_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err.response.data });
    });
};

export const leaveQuotaListAction = (data) => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  const endpoint = !isEmpty(data) ? `leavetypes/${data}` : "leave-quota/list";
  axios
    .get(getCurrentHost() + endpoint, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: LEAVE_QUOTA_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err.response.data });
    });
};

export const leaveTypeAction = () => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  axios
    .get(getCurrentHost() + "leavetypes/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: LEAVE_TYPE_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err?.response?.data });
    });
};

export const holidaysAction = () => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  axios
    .get(getCurrentHost() + "holiday/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: HOLIDAYS_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err.response.data });
    });
};

export const createHolidayAction = (data) => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  axios
    .post(getCurrentHost() + "holiday/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CREATE_HOLIDAYS_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err.response.data });
    });
};

export const deleteHolidayAction = (data) => async (dispatch) => {
  dispatch({ type: LEAVE_LOADING });
  axios
    .delete(getCurrentHost() + `holiday/delete/${data.date}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: DELETE_HOLIDAYS_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: LEAVE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: LEAVE_ERROR, payload: err.response.data });
    });
};
