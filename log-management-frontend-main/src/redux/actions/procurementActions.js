import axios from "axios";
import {
  PROCUREMENT_LOADING,
  CREATE_VENDOR_SUCCESS,
  PROCUREMENT_ERROR,
  VENDOR_SHOW_SUCCESS,
  VENDORS_LIST_SUCCESS,
  UPDATE_VENDOR_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  PRODUCTS_LIST_SUCCESS,
  PRODUCT_DETAIL_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  PROCUREMENT_REQUIREMENT_SUCCESS,
  PROCUREMENT_REQUIREMENT_BY_ID_SUCCESS,
  PROCUREMENT_REQUIREMENT_BY_PROJECT_ID_SUCCESS,
  UPDATE_PROCUREMENT_REQUIREMENT_SUCCESS,
  VENDOR_RFQ_LIST_SUCCESS,
  VENDOR_BID_ITEMS_SUCCESS,
  ADD_BID_ITEM_SUCCESS,
  REMOVE_BID_ITEM_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DOES_VENDOR_EXIST,
  LIST_INTENT_SUCCESS,
  VENDOR_LOGIN_SUCCESS,
  SEND_OTP_SUCCESS,
  VERIFY_OTP_SUCCESS,
  CREATE_RFQ_SUCCESS,
  UPDATE_INTENT_TO_BID,
  GET_INTENT_SUCCESS,
  UPDATE_INTENT_SUCCESS,
  CRATE_PURCHASE_ORDER_SUCCESS,
  RFQ_LIST_SUCCESS,
  RFQ_BY_PROJECT_SUCCESS,
  RFQ_BY_ID_SUCCESS,
  UPDATE_RFQ_SUCCESS,
  CLOSE_RFQ_SUCCESS,
  WANT_TO_BID,
  SHOW_LOADER,
  HIDE_LOADER,
} from "./types";

import { authHeader } from "./authHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCurrentHost,
  getCurrentUser,
  isEmpty,
  throwError,
} from "../constants/index";

// Create Vendor
export const createVendor = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "vendor/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CREATE_VENDOR_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// List Vendor
export const listVendors = () => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + "vendor/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: VENDORS_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Update Vendor
export const updateVendor = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .put(getCurrentHost() + "vendor/update/" + data.id, data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: UPDATE_VENDOR_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Get Vendor data
export const showVendor = (id) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + `vendor/${id}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: VENDOR_SHOW_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// List Products
export const productList = () => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + "product/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      console.log("productsListData", res);
      if (res.data) {
        dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: res?.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// get product
export const getProductDetails = (id) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + "product/" + id, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Add Product
export const createProduct = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "product/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Update Product
export const updateProduct = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .put(getCurrentHost() + "product/update/" + data?.id, data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

export const procurementRequirementList = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + "procurement/request/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: PROCUREMENT_REQUIREMENT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

export const getProcurementRequirementById = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + `requirement/request/${data.project_id}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({
          type: PROCUREMENT_REQUIREMENT_BY_ID_SUCCESS,
          payload: res.data,
        });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

export const getProcurementRequirementByProjectId =
  (data) => async (dispatch) => {
    dispatch({ type: PROCUREMENT_LOADING });
    axios
      .get(getCurrentHost() + `requirement/request/list/${data.project_id}`, {
        headers: authHeader(true),
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: PROCUREMENT_REQUIREMENT_BY_PROJECT_ID_SUCCESS,
            payload: res.data,
          });
        } else {
          throwError(res);
          dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
        }
      })
      .catch((err) => {
        throwError(err.response);
        dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
      });
  };

export const updateProcurementRequirement = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .put(getCurrentHost() + "product/update/" + data?.id, data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({
          type: UPDATE_PROCUREMENT_REQUIREMENT_SUCCESS,
          payload: res.data,
        });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// DELETE Product
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .delete(getCurrentHost() + "product/delete/" + id, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Does Vendor Exist
export const doesUserExist = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "user/does-exist", data, {
      headers: authHeader(false),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: DOES_VENDOR_EXIST, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Register / Login Vendor
export const loginVendor = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "vendor/login", data, {
      headers: authHeader(false),
    })
    .then((res) => {
      if (res.data) {
        localStorage.setItem("jwtToken", res?.data?.auth?.token);
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("profileURL", res.data?.photo_url);
        localStorage.setItem("Name", res?.data?.name);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: VENDOR_LOGIN_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// send OTP
export const sendOTP = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "user/send/otp", data, {
      headers: authHeader(false),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: SEND_OTP_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// verify OTP
export const verifyOTP = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "user/verify/otp", data, {
      headers: authHeader(false),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROCUREMENT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// REQUEST FOR QUOTATIONS

// Create RFQ
export const createRFQ = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "rfq/create", data?.items, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: CREATE_RFQ_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// List RFQ
export const listRFQ = () => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + "rfq/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: RFQ_LIST_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// List RFQ by Project
export const listRFQbyProject = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + `rfq/list/${data.project_id}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: RFQ_BY_PROJECT_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Get RFQ
export const getRFQ = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + `rfq/${data.id}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: RFQ_BY_ID_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Update RFQ
export const updateRFQ = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .put(getCurrentHost() + `rfq/update/${data.id}`, data?.items, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: UPDATE_RFQ_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Close RFQ
export const closeRFQ = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .delete(getCurrentHost() + `rfq/close/${data.id}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: CLOSE_RFQ_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Vendor intend to bid
export const wantToBid = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "rfq/intent/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: WANT_TO_BID, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// GET RFQ INTENT
export const getIntent = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + `rfq/intent/${data}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: GET_INTENT_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Vendor intend update
export const updateIntentToBid = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .put(getCurrentHost() + `rfq/intent/submit`, data, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: UPDATE_INTENT_TO_BID, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Vendor intend update
export const updateIntent = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .put(getCurrentHost() + `rfq/intent/update/${data.id}`, data.items, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: UPDATE_INTENT_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

// Vendor intend approved
export const approveIntent = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .put(getCurrentHost() + `rfq/intent/approve/${data.id}`, data.items, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: UPDATE_INTENT_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

//List Intent
export const listIntents = (id) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "rfq/intent/list", id, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: LIST_INTENT_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

//Create Purchase Order
export const createPurchaseOrder = (data) => async (dispatch) => {
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "purchase-order/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: CRATE_PURCHASE_ORDER_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

export const vendorListRFQs = (data) => async (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .get(getCurrentHost() + "vendor/list-rfqs", {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: VENDOR_RFQ_LIST_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      dispatch({ type: HIDE_LOADER });
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

export const AddBidItems = (data) => async (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "rfq/response/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: ADD_BID_ITEM_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      dispatch({ type: HIDE_LOADER });
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

export const RemoveBidItems = (data) => async (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .delete(getCurrentHost() + `rfq/response/remove/${data}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: REMOVE_BID_ITEM_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      dispatch({ type: HIDE_LOADER });
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};

export const getBidItems = (data) => async (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  dispatch({ type: PROCUREMENT_LOADING });
  axios
    .post(getCurrentHost() + "rfq/response/list", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      dispatch({ type: HIDE_LOADER });
      dispatch({ type: VENDOR_BID_ITEMS_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      dispatch({ type: HIDE_LOADER });
      throwError(err.response);
      dispatch({ type: PROCUREMENT_ERROR, payload: err.response.data });
    });
};
