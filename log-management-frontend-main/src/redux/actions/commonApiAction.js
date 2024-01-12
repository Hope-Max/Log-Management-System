import axios from "axios";
import {
  COMMON_API_LOADING,
  CATEGORY_LIST_SUCCESS,
  JOB_ROLE_SUCCESS,
  CERTIFICATES_SUCCESS,
  LIST_USERS_SUCCESS,
  PROFILE_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  COMMON_API_ERROR,
  DOWNLOAD_IMAGE_SUCCESS,
  DASHBOARD_DATA_SUCCESS,
  CONNECTED_DEVICE_LIST_SUCCESS,
  EMPLOYEE_PROFILE_SUCCESS,
} from "./types";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentHost, getCommonURL, throwError } from "../constants/index";

// categories
export const categories = () => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .post(getCommonURL() + "category-list", null, {
      headers: authHeader(false),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
    });
};

// skills
export const ListUsers = () => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .get(getCurrentHost() + "users/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res?.data) {
        dispatch({ type: LIST_USERS_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      console.log("error", err?.response);
      if (err?.response?.data?.status == 401) {
      }
      dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
    });
};

// certificates
export const certificates = () => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });

  axios
    .post(
      getCommonURL() + "certificate-list",
      {},
      {
        headers: authHeader(false),
      }
    )
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: CERTIFICATES_SUCCESS, payload: res.data.data });
      } else {
        throwError(res);
        dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
    });
};

// roles
export const roles = () => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .post(getCommonURL() + "role-list", {})
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: JOB_ROLE_SUCCESS, payload: res.data.data });
      } else {
        throwError(res);
        dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
    });
};

// Upload Picture
export const upload = () => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .get(getCurrentHost() + "upload", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data.data });
        return res.data;
      } else {
        throwError(res);
        dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
        return res.data.message;
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
      return err.response.data;
    });
};

// Upload Picture Axios
export const getSignedUploadUrl = async (data) => {
  return axios
    .post(getCurrentHost() + "upload", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      console.log("handleUploadProfileAvatar res", res);
      return res;
    })
    .catch((err) => {
      throwError(err.response);
      return err.response.data;
    });
};

export const uploadFile = async (url, file) => {
  return axios
    .put(url, file)
    .then((res) => {
      //   console.log("handleUploadProfileAvatar res", res);
      return res;
    })
    .catch((err) => {
      throwError(err.response);
      return err?.response?.data;
    });
};

// Download Picture/File
export const download = (data) => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .post(
      getCurrentHost() + "download",
      { key: data, belongsTo: null },
      {
        headers: authHeader(true),
      }
    )
    .then((res) => {
      if (res) {
        console.log("Resssss", res);
        window?.open(res?.data?.url, "_blank");
        dispatch({ type: DOWNLOAD_IMAGE_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
    });
};

export const getProfile = () => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .get(getCurrentHost() + "user", {
      headers: authHeader(true),
    })
    .then((res) => {
      //console.log('Profile User ', res);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: PROFILE_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
    });
};

// get employee profile
export const getEmployeeProfile = (data) => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .get(getCurrentHost() + `user/${data.id}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: EMPLOYEE_PROFILE_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
    });
};

//connected-devices-list
export const connectedDeviceList = (data) => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .post(getCurrentHost() + "connected-devices-list", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: CONNECTED_DEVICE_LIST_SUCCESS,
          payload: response.data.data,
        });
      } else {
        throwError(response);
        dispatch({ type: COMMON_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      dispatch({ type: COMMON_API_ERROR, payload: error.response });
    });
};

//Set cancel popup
export const setCancelledStatus = (data) => async (dispatch) => {
  dispatch({ type: COMMON_API_LOADING });
  axios
    .post(getCurrentHost() + "set_cancelled_status", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: CONNECTED_DEVICE_LIST_SUCCESS,
          payload: response.data.data,
        });
      } else {
        throwError(response);
        dispatch({ type: COMMON_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      dispatch({ type: COMMON_API_ERROR, payload: error.response });
    });
};

//Dashboard Data
export const dashboardData =
  (data = {}) =>
  async (dispatch) => {
    dispatch({ type: COMMON_API_LOADING });
    axios
      .post(getCurrentHost() + "dashboard-data", data, {
        headers: authHeader(true),
      })
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: DASHBOARD_DATA_SUCCESS, payload: res.data.data });
        } else {
          throwError(res);
          dispatch({ type: COMMON_API_ERROR, payload: res.data.message });
        }
      })
      .catch((err) => {
        throwError(err.response);
        dispatch({ type: COMMON_API_ERROR, payload: err.response.data });
      });
  };
