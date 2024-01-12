import axios from "axios";
import {
  ESTIMATION_LOADING,
  CREATE_BOQ_SUCCESS,
  UPDATE_BILL_TABLE_ACTION,
  BOQ_LIST_SUCCESS,
  BOQ_BY_ID_SUCCESS,
  UPDATE_BOQ_SUCCESS,
  CREATE_PROCURE_SUCCESS,
  ESTIMATION_ERROR,
} from "./types";
import { getCurrentHost, throwError } from "../constants/index";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const boqList = (data) => async (dispatch) => {
  dispatch({ type: ESTIMATION_LOADING });
  axios
    .get(getCurrentHost() + "boq/list", {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: BOQ_LIST_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ESTIMATION_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ESTIMATION_ERROR, payload: error.response });
    });
};

export const boqById = (data) => async (dispatch) => {
  dispatch({ type: ESTIMATION_LOADING });
  axios
    .get(getCurrentHost() + `boq/${data}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: BOQ_BY_ID_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ESTIMATION_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ESTIMATION_ERROR, payload: error.response });
    });
};

// Shift create
export const createBillAction = (data) => async (dispatch) => {
  dispatch({ type: ESTIMATION_LOADING });
  axios
    .post(getCurrentHost() + "boq/create", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: CREATE_BOQ_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ESTIMATION_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ESTIMATION_ERROR, payload: error.response });
    });
};

export const updateBillTableAction = (data) => async (dispatch) => {
  dispatch({ type: ESTIMATION_LOADING });
  axios
    .put(getCurrentHost() + `boq/update-items/${data.id}`, data.items, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: UPDATE_BILL_TABLE_ACTION, payload: response.data });
      } else {
        dispatch({ type: ESTIMATION_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ESTIMATION_ERROR, payload: error.response });
    });
};

export const updateBoq = (data) => async (dispatch) => {
  dispatch({ type: ESTIMATION_LOADING });
  axios
    .put(getCurrentHost() + `boq/update/${data.id}`, data.items, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: UPDATE_BOQ_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ESTIMATION_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ESTIMATION_ERROR, payload: error.response });
    });
};

export const createProcureRequest = (data) => async (dispatch) => {
  dispatch({ type: ESTIMATION_LOADING });
  axios
    .post(getCurrentHost() + `procurement/request/create`, data.items, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: CREATE_PROCURE_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ESTIMATION_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ESTIMATION_ERROR, payload: error.response });
    });
};
