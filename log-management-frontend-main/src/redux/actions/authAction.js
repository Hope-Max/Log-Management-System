import axios from "axios";
import {
  SET_CURRENT_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AUTH_LOADING,
  REGISTER_OTP_SUCCESS,
  SAVE_NEW_PASSWORD_SUCCESS,
  AUTH_ERROR,
  SAVE_NEW_PASSWORD_ERROR,
  REGISTER_OTP_ERROR,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_ERROR,
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CREATE_USER_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_ERROR,
  DELETE_USER_SUCCESS,
  HIDE_LOADER,
} from "./types";
import { getCurrentHost, throwError } from "./../constants/index";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import man from "../../../src/assets/images/dashboard/profile.png";
import "react-toastify/dist/ReactToastify.css";

// set Current user function
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Error function

// Vendor Login
export const LoginAction = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(getCurrentHost() + "user/login", data, {
      headers: authHeader(false),
    })
    .then((response) => {
      console.log("response", response);
      if (response) {
        localStorage.setItem("jwtToken", response?.data?.auth?.token);
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("profileURL", response.data?.photoURL ?? man);
        localStorage.setItem("Name", response?.data?.fullName);
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: HIDE_LOADER });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: HIDE_LOADER });
        dispatch({ type: LOGIN_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      console.log("error", error.response);
      throwError(error.response);
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: LOGIN_ERROR, payload: error.response });
    });
};

export const CreateUser = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(getCurrentHost() + "users/create", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      console.log("response", response);
      if (response?.data) {
        dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: CREATE_USER_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      console.log("error", error?.response);
      throwError(error.response);
      dispatch({ type: CREATE_USER_ERROR, payload: error });
    });
};

export const setNewPassword = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .put(getCurrentHost() + "user/set/password", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      console.log("response", response);
      if (response) {
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response });
      } else {
        throwError(response);
        dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: response.data.message,
        });
      }
    })
    .catch((error) => {
      console.log("error", error?.response);
      dispatch({ type: RESET_PASSWORD_ERROR, payload: error });
    });
};

export const resetPassword = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .put(
      getCurrentHost() + `user/reset/password/${data}`,
      {},
      {
        headers: authHeader(true),
      }
    )
    .then((response) => {
      console.log("response", response);
      if (response) {
        dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: response });
        toast.success("User password reset successfully");
      } else {
        throwError(response);
        dispatch({
          type: USER_RESET_PASSWORD_ERROR,
          payload: response.data.message,
        });
      }
    })
    .catch((error) => {
      console.log("error", error?.response);
      throwError(error.response);
      dispatch({ type: USER_RESET_PASSWORD_ERROR, payload: error });
    });
};

export const UpdateUser = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .put(getCurrentHost() + `user/${data.id}`, data, {
      headers: authHeader(true),
    })
    .then((response) => {
      console.log("response", response.data);
      if (response?.data) {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: UPDATE_USER_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      console.log("error", error);
      throwError(error.response);
      dispatch({ type: UPDATE_USER_ERROR, payload: error });
    });
};

export const getUserAction = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .get(getCurrentHost() + `user/${data}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      console.log("response", response);
      if (response?.data) {
        dispatch({ type: GET_USER_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: GET_USER_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      console.log("error", error?.response);
      throwError(error.response);
      dispatch({ type: GET_USER_ERROR, payload: error });
    });
};

export const deleteUserAction = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .delete(getCurrentHost() + `user/${data}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      console.log("response", response);
      if (response?.data) {
        dispatch({ type: DELETE_USER_SUCCESS, payload: response.data });
      } else {
        throwError(response);
        dispatch({ type: AUTH_ERROR, payload: response.data.message });
      }
    })
    .catch((error) => {
      console.log("error", error?.response);
      throwError(error.response);
      dispatch({ type: AUTH_ERROR, payload: error });
    });
};

// OTP Register Verify
export const OTPRegVerify = (user) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(getCurrentHost() + "verify_otp", user)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: REGISTER_OTP_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: REGISTER_OTP_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: REGISTER_OTP_ERROR, payload: err.response.data });
    });
};

// Resend OTP
export const ResendOTP = (user) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(getCurrentHost() + "send_otp", user)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: RESEND_OTP_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: RESEND_OTP_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: RESEND_OTP_ERROR, payload: err.response.data });
    });
};

// Forgot Password
export const forgotLink = (user) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(getCurrentHost() + "password-reset", user)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: FORGOT_PASSWORD_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: FORGOT_PASSWORD_ERROR, payload: err.response.data });
    });
};

// setNew Password
// export const setNewPassword = (user) => async (dispatch) => {
//   dispatch({ type: AUTH_LOADING });
//   axios
//     .post(getCurrentHost() + "set-new-password", user)
//     .then((res) => {
//       if (res.data.status) {
//         dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
//       } else {
//         throwError(res);
//         dispatch({ type: RESET_PASSWORD_ERROR, payload: res.data.message });
//       }
//     })
//     .catch((err) => {
//       dispatch({ type: RESET_PASSWORD_ERROR, payload: err.response.data });
//     });
// };

// Save new Password
export const saveNewPassword = (user) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(getCurrentHost() + "save-change-password", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: SAVE_NEW_PASSWORD_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({
          type: SAVE_NEW_PASSWORD_ERROR,
          payload: res.data.message,
        });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: SAVE_NEW_PASSWORD_ERROR, payload: err.response.data });
    });
};

// Logout User
export const logoutUser = (logout) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  axios
    .post(getCurrentHost() + "logout", logout, {
      headers: authHeader(true),
    })
    .then((response) => {
      toast.success("User logged out successfully");
      localStorage.clear();
      dispatch(setCurrentUser({}));
      setTimeout(() => {
        window.location.replace("/login");
      }, 300);
    })
    .catch((err) => {
      throwError(err.response);
      console.log("logout error", err.response.data);
    });
};
