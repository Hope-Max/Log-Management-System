import axios from "axios";
import {
  COMPANY_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  COMPANY_PROFILE_ERROR,
  CRAETE_BRANCH_SUCCESS,
  UPDATE_BRANCH_SUCCESS,
} from "./types";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentHost, throwError } from "../constants/index";

// updateProfile
export const updateProfile = (user) => async (dispatch) => {
  dispatch({ type: COMPANY_PROFILE_LOADING });
  axios
    .post(getCurrentHost() + "update-company-profile", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res?.data });
      } else {
        throwError(res);
        dispatch({ type: COMPANY_PROFILE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: COMPANY_PROFILE_ERROR, payload: err.response.data });
    });
};

// Create branch
export const createBranch = (user) => async (dispatch) => {
  dispatch({ type: COMPANY_PROFILE_LOADING });
  axios
    .post(getCurrentHost() + "create-branch", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: CRAETE_BRANCH_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: COMPANY_PROFILE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: COMPANY_PROFILE_ERROR, payload: err.response.data });
    });
};

// update branch
export const updateBranch = (user) => async (dispatch) => {
  dispatch({ type: COMPANY_PROFILE_LOADING });
  axios
    .post(getCurrentHost() + "update-branch", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: UPDATE_BRANCH_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: COMPANY_PROFILE_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: COMPANY_PROFILE_ERROR, payload: err.response.data });
    });
};

// // certificates
// export const certificates = () => async (dispatch) => {
//     dispatch({ type: COMPANY_PROFILE_LOADING });

//     axios
//         .post(common + "certificate-list", {}, {
//             headers: authHeader(false),
//         })
//         .then((res) => {
//             if (res.data.status) {
//                 dispatch({ type: CERTIFICATES_SUCCESS, payload: res.data.data });
//             } else {
//                 throwError(res);
//                 dispatch({ type: COMPANY_PROFILE_ERROR, payload: res.data.message });
//             }
//         })
//         .catch((err) => {
//             dispatch({ type: COMPANY_PROFILE_ERROR, payload: err.response.data });
//         });
// };

// // roles
// export const roles = () => async (dispatch) => {
//     dispatch({ type: COMPANY_PROFILE_LOADING });
//     axios
//         .post(common + "role-list", {})
//         .then((res) => {
//             if (res.data.status) {
//                 dispatch({ type: JOB_ROLE_SUCCESS, payload: res.data.data });
//             } else {
//                 throwError(res);
//                 dispatch({ type: COMPANY_PROFILE_ERROR, payload: res.data.message });
//             }
//         })
//         .catch((err) => {
//             dispatch({ type: COMPANY_PROFILE_ERROR, payload: err.response.data });
//         });
// };

// // profile
// export const getProfile = () => async (dispatch) => {
//     dispatch({ type: COMPANY_PROFILE_LOADING });
//     axios
//         .get(getCurrentHost() + "profile", {
//             headers: authHeader(true),
//         })
//         .then((res) => {
//             if (res.data.status) {
//                 dispatch({ type: PROFILE_SUCCESS, payload: res.data.data });
//             } else {
//                 throwError(res);
//                 dispatch({ type: COMPANY_PROFILE_ERROR, payload: res.data.message });
//             }
//         })
//         .catch((err) => {
//             dispatch({ type: COMPANY_PROFILE_ERROR, payload: err.response.data });
//         });
// };
