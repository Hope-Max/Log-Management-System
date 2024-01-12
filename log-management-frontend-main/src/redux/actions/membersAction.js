import axios from "axios";
import {
  SUBSCRIPTION_LIST_SUCCESS,
  MEMBER_LOADING,
  MEMBER_ERROR,
  LIST_JOB_POISTIONS_SUCCESS,
  CREATE_MEMBER_SUCCESS,
  DETAIL_MEMBER_SUCCESS,
  UPDATE_MEMBER_SUCCESS,
  REMOVE_MEMBER_SUCCESS,
  LIST_MEMBER_SUCCESS,
  CONNECTED_DEVICE_LIST_SUCCESS,
  UPDATE_ADDITIONAL_VERIFY_SUCCESS,
} from "./types";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentHost } from "../constants/index";

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

// updateProfile
// export const createMember = (user = {}) => async (dispatch) => {
//     dispatch({ type: MEMBER_LOADING });
//     axios
//       .post(
//         getCurrentHost() + "create-member",
//         {},
//         {
//           headers: authHeader(true),
//         }
//       )
//       .then((res) => {
//         if (res.data.status) {
//           dispatch({ type: SUBSCRIPTION_LIST_SUCCESS, payload: res.data.data });
//         } else {
//           throwError(res);
//           dispatch({ type: MEMBER_ERROR, payload: res.data.message });
//         }
//       })
//       .catch((err) => {
//         dispatch({ type: MEMBER_ERROR, payload: err.response.data });
//       });
// };

// Create branch
export const listJobPositions = (user) => async (dispatch) => {
  dispatch({ type: MEMBER_LOADING });
  axios
    .post(getCurrentHost() + "list-job-postions", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: LIST_JOB_POISTIONS_SUCCESS, payload: res.data.data });
      } else {
        throwError(res);
        dispatch({ type: MEMBER_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: MEMBER_ERROR, payload: err.response.data });
    });
};

// export const premiumSubscriptionDetail = (user) => async (dispatch) => {
//     dispatch({ type: MEMBER_LOADING });
//     axios
//       .post(getCurrentHost() + "premium-subscription-details", user, {
//         headers: authHeader(true),
//       })
//       .then((res) => {
//         if (res.data.status) {
//           dispatch({ type: CREATE_MEMBER_SUCCESS, payload: res.data.data });
//         } else {
//           throwError(res);
//           dispatch({ type: MEMBER_ERROR, payload: res.data.message });
//         }
//       })
//       .catch((err) => {
//         dispatch({ type: MEMBER_ERROR, payload: err.response.data });
//       });
// };

export const createMember = (user) => async (dispatch) => {
  dispatch({ type: MEMBER_LOADING });
  axios
    .post(getCurrentHost() + "create-member", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: CREATE_MEMBER_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: MEMBER_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: MEMBER_ERROR, payload: err.response.data });
    });
};

//billing - info - detail;
export const detailMember = (user) => async (dispatch) => {
  dispatch({ type: MEMBER_LOADING });
  axios
    .post(getCurrentHost() + "detail-member", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: DETAIL_MEMBER_SUCCESS, payload: res.data.data });
      } else {
        throwError(res);
        dispatch({ type: MEMBER_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: MEMBER_ERROR, payload: err.response.data });
    });
};

// // update-billing-detail;
export const updateMember = (user) => async (dispatch) => {
  dispatch({ type: MEMBER_LOADING });
  axios
    .post(getCurrentHost() + "update-member", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: UPDATE_MEMBER_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: MEMBER_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: MEMBER_ERROR, payload: err.response.data });
    });
};

// // save-billing-detail;
export const removeMember = (user) => async (dispatch) => {
  dispatch({ type: MEMBER_LOADING });
  axios
    .post(getCurrentHost() + "remove-member", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: REMOVE_MEMBER_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: MEMBER_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: MEMBER_ERROR, payload: err.response.data });
    });
};

// // create-card;
export const listMember = (user) => async (dispatch) => {
  dispatch({ type: MEMBER_LOADING });
  axios
    .post(getCurrentHost() + "list-member", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: LIST_MEMBER_SUCCESS, payload: res.data.data });
      } else {
        throwError(res);
        dispatch({ type: MEMBER_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: MEMBER_ERROR, payload: err.response.data });
    });
};

// pay-by-card;
export const connectedDeviceList = (user) => async (dispatch) => {
  dispatch({ type: MEMBER_LOADING });
  axios
    .post(getCurrentHost() + "connected-devices-list", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: CONNECTED_DEVICE_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: MEMBER_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: MEMBER_ERROR, payload: err.response.data });
    });
};

// certificates
export const updateAdditionalVerify = () => async (dispatch) => {
  dispatch({ type: MEMBER_LOADING });

  axios
    .post(
      getCurrentHost() + "update-additional-verify",
      {},
      {
        headers: authHeader(false),
      }
    )
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: UPDATE_ADDITIONAL_VERIFY_SUCCESS,
          payload: res.data.data,
        });
      } else {
        throwError(res);
        dispatch({ type: MEMBER_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: MEMBER_ERROR, payload: err.response.data });
    });
};

// // roles
// export const roles = () => async (dispatch) => {
//     dispatch({ type: SUBSCRIPTION_LOADING });
//     axios
//         .post(common + "role-list", {})
//         .then((res) => {
//             if (res.data.status) {
//                 dispatch({ type: JOB_ROLE_SUCCESS, payload: res.data.data });
//             } else {
//                 throwError(res);
//                 dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
//             }
//         })
//         .catch((err) => {
//             dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
//         });
// };

// // profile
// export const getProfile = () => async (dispatch) => {
//     dispatch({ type: SUBSCRIPTION_LOADING });
//     axios
//         .get(getCurrentHost() + "profile", {
//             headers: authHeader(true),
//         })
//         .then((res) => {
//             if (res.data.status) {
//                 dispatch({ type: PROFILE_SUCCESS, payload: res.data.data });
//             } else {
//                 throwError(res);
//                 dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
//             }
//         })
//         .catch((err) => {
//             dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
//         });
// };
