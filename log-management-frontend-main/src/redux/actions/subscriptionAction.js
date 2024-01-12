import axios from "axios";
import {
  SUBSCRIPTION_LOADING,
  SUBSCRIPTION_LIST_SUCCESS,
  SUBSCRIPTION_ERROR,
  CANCEL_RENEWAL_SUCCESS,
  PREMIUM_SUBSCRIPTION_SUCCESS,
  BILLING_HISTORY_SUCCESS,
  BILLING_INFO_SUCCESS,
  BILLING_DETAIL_SUCCESS,
  SAVE_DETAIL_SUCCESS,
  PAY_BY_CARD_SUCCESS,
  CREATE_CARD_SUCCESS,
  UPDATE_BRANCH_SUCCESS,
  REMOVE_CARD_SUCCESS,
  PAY_BY_CARD_ERROR,
  CREATE_CARD_ERROR,
  SAVE_DETAIL_ERROR,
  UPDATE_CARD_SUCCESS,
  BILLING_INFO_DETAILS_SUCCESS,
} from "./types";
import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentHost, throwError } from "../constants/index";

// updateProfile
export const subscriptionList =
  (user = {}) =>
  async (dispatch) => {
    dispatch({ type: SUBSCRIPTION_LOADING });
    axios
      .post(
        getCurrentHost() + "subscription-list",
        {},
        {
          headers: authHeader(true),
        }
      )
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: SUBSCRIPTION_LIST_SUCCESS, payload: res.data.data });
        } else {
          dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
        }
      })
      .catch((err) => {
        throwError(err.response);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
      });
  };

// Create branch
export const cancelRenewal = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "cancel-renewal", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: CANCEL_RENEWAL_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err);
      dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
    });
};

export const premiumSubscriptionDetail = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "premium-subscription-details", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: PREMIUM_SUBSCRIPTION_SUCCESS,
          payload: res.data.data,
        });
      } else {
        throwError(res);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
    });
};

export const listAllBillingHistory = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "list-all-billing-history", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: BILLING_HISTORY_SUCCESS, payload: res.data.data });
      } else {
        throwError(res);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
    });
};

// billing - info - detail;
export const billingInfoDetail = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "billing-info-detail", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: BILLING_INFO_SUCCESS, payload: res.data.data });
      } else {
        throwError(res);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
    });
};

// update-billing-detail;
export const updateBillingDetail = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "update-billing-detail", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: BILLING_DETAIL_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err);
      dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
    });
};

// save-billing-detail;
export const saveBillingDetail = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "save-billing-detail", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: SAVE_DETAIL_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: SAVE_DETAIL_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: SAVE_DETAIL_ERROR, payload: err.response.data });
    });
};

// create-card;
export const createCard = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "create-card", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: CREATE_CARD_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: CREATE_CARD_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: CREATE_CARD_ERROR, payload: err.response.data });
    });
};

// pay-by-card;
export const payByCard = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "pay-by-card", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: PAY_BY_CARD_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PAY_BY_CARD_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: PAY_BY_CARD_ERROR, payload: err.response.data });
    });
};

// update - card;
export const updateCardData = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "update-card", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: UPDATE_CARD_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
    });
};

// remove - card;
export const removeCardData = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "remove-card", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: REMOVE_CARD_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
    });
};

// Billing info details;
export const billingInfoDetails = (user) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_LOADING });
  axios
    .post(getCurrentHost() + "billing-info-detail", user, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: BILLING_INFO_SUCCESS, payload: res.data.data });
      } else {
        throwError(res);
        dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data });
      }
    })
    .catch((err) => {
      dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
    });
};

// // certificates
// export const certificates = () => async (dispatch) => {
//     dispatch({ type: SUBSCRIPTION_LOADING });

//     axios
//         .post(common + "certificate-list", {}, {
//             headers: authHeader(false),
//         })
//         .then((res) => {
//             if (res.data.status) {
//                 dispatch({ type: CERTIFICATES_SUCCESS, payload: res.data.data });
//             } else {
//                 throwError(res);
//                 dispatch({ type: SUBSCRIPTION_ERROR, payload: res.data.message });
//             }
//         })
//         .catch((err) => {
//             dispatch({ type: SUBSCRIPTION_ERROR, payload: err.response.data });
//         });
// };

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
