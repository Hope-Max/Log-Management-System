import axios from "axios";
import {
  BRANCH_LIST_SUCCESS,
  COMMON_API_ERROR,
  COMMON_API_LOADING,
  CRAETE_SHIFT_ERROR,
  CRAETE_SHIFT_LOADING,
  CRAETE_SHIFT_SUCCESS,
  RELEASE_PAYMENT_SUCCESS,
} from "./types";
import { getCurrentHost } from "./../constants/index";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Error function
export function throwError(response) {
  return toast.error(response.data.message, {
    position: "top-right",
    toastId: "1",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

// Shift create
export const createShift = (data) => async (dispatch) => {
  dispatch({ type: CRAETE_SHIFT_LOADING });
  axios
    .post(getCurrentHost() + "create-shift", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data.status) {
        dispatch({ type: CRAETE_SHIFT_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: CRAETE_SHIFT_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: CRAETE_SHIFT_ERROR, payload: error.response });
    });
};

// Branch list
export const branchList = () => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .post(
      getCurrentHost() + "branch-list-for-shift",
      {},
      {
        headers: authHeader(true),
      }
    )
    .then((response) => {
      if (response.data.status) {
        dispatch({ type: BRANCH_LIST_SUCCESS, payload: response.data.data });
      } else {
        throwError(response);
        dispatch({ type: COMMON_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: COMMON_API_ERROR, payload: error.response });
    });
};

// Shift Release payment
export const releasePayment = (data) => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .post(getCurrentHost() + "release-payment", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: RELEASE_PAYMENT_SUCCESS,
          payload: response.data,
        });
      } else {
        throwError(response);
        dispatch({ type: COMMON_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: COMMON_API_ERROR, payload: error.response });
    });
};
