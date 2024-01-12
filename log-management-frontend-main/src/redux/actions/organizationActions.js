import axios from "axios";
import {
  ORGANIZATION_API_ERROR,
  ORGANIZATION_API_LOADING,
  CREATE_DESIGNATION_SUCCESS,
  CREATE_ASSET_SUCCESS,
  DESIGNATION_LIST_SUCCESS,
  DESIGNATION_UPDATE_SUCCESS,
  DESIGNATION_DELETE_SUCCESS,
  ASSET_LIST_SUCCESS,
  ORGANIZATION_EXPENSE_LIST_SUCCESS,
  UPDATE_ASSET_SUCCESS,
  DELETE_ASSET_SUCCESS,
} from "./types";
import { getCurrentHost, throwError } from "../constants/index";
import { authHeader } from "./authHeader";

export const createDesignationAction = (data) => async (dispatch) => {
  dispatch({ type: ORGANIZATION_API_LOADING });
  axios
    .post(getCurrentHost() + "designations/create", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: CREATE_DESIGNATION_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
    });
};

export const designationListAction = (data) => async (dispatch) => {
  dispatch({ type: ORGANIZATION_API_LOADING });
  axios
    .get(getCurrentHost() + "designations/list", {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: DESIGNATION_LIST_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
    });
};

export const designationUpdateAction = (data) => async (dispatch) => {
  dispatch({ type: ORGANIZATION_API_LOADING });
  axios
    .put(getCurrentHost() + `designation/update/${data.id}`, data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: DESIGNATION_UPDATE_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
    });
};

export const designationDeleteAction = (data) => async (dispatch) => {
  dispatch({ type: ORGANIZATION_API_LOADING });
  axios
    .delete(getCurrentHost() + `designation/delete/${data.id}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: DESIGNATION_DELETE_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
    });
};

export const createAssetAction = (data) => async (dispatch) => {
  dispatch({ type: ORGANIZATION_API_LOADING });
  axios
    .post(getCurrentHost() + "assets/create", data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: CREATE_ASSET_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
    });
};

export const assetListAction = (data) => async (dispatch) => {
  dispatch({ type: ORGANIZATION_API_LOADING });
  axios
    .get(getCurrentHost() + "assets/list", {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: ASSET_LIST_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
    });
};

export const updateAssetAction = (data) => async (dispatch) => {
  dispatch({ type: ORGANIZATION_API_LOADING });
  axios
    .put(getCurrentHost() + `assets/${data?.id}`, data, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: UPDATE_ASSET_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
    });
};

export const assetDeleteAction = (data) => async (dispatch) => {
  dispatch({ type: ORGANIZATION_API_LOADING });
  axios
    .delete(getCurrentHost() + `asset/delete/${data.id}`, {
      headers: authHeader(true),
    })
    .then((response) => {
      if (response.data) {
        dispatch({ type: DELETE_ASSET_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
      }
    })
    .catch((error) => {
      throwError(error.response);
      dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
    });
};

export const organizationExpenseListAction =
  (data = "all") =>
  async (dispatch) => {
    dispatch({ type: ORGANIZATION_API_LOADING });
    axios
      .get(getCurrentHost() + `expenses/org/${data}`, {
        headers: authHeader(true),
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: ORGANIZATION_EXPENSE_LIST_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({ type: ORGANIZATION_API_ERROR, payload: response.data });
        }
      })
      .catch((error) => {
        throwError(error.response);
        dispatch({ type: ORGANIZATION_API_ERROR, payload: error.response });
      });
  };
