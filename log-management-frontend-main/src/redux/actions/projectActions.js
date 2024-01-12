import axios from "axios";
import {
  PROJECT_LOADING,
  CREATE_PROJECT_SUCCESS,
  PROJECT_ERROR,
  PROJECTS_LIST_SUCCESS,
  PROJECT_SHOW_SUCCESS,
  ASSIGN_USER_LOADING,
  ASSIGN_USER_SUCCESS,
  CLIENTS_LIST_SUCCESS,
  CREATE_REQUIREMENT_SUCCESS,
  UPDATE_REQUIREMENT_SUCCESS,
  CLIENT_DETAIL_SUCCESS,
  CREATE_CLIENT_SUCCESS,
  REQUIREMENT_REQUEST_LIST_SUCCESS,
  GET_REQUIREMENT_REQUEST_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  ASSIGN_USER_ERROR,
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

//Error function

// Add Project
export const createProject = (data) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .post(getCurrentHost() + "projects/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CREATE_PROJECT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

// List Projects
export const listProjects = () => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(getCurrentHost() + "projects/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: PROJECTS_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err?.response?.data });
    });
};

// List a project
export const showProject = (data) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(getCurrentHost() + `projects/${data.id}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: PROJECT_SHOW_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

export const assignUser = (data) => async (dispatch) => {
  dispatch({ type: ASSIGN_USER_LOADING });
  axios
    .post(getCurrentHost() + "projects/user/assigned", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: ASSIGN_USER_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: ASSIGN_USER_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: ASSIGN_USER_ERROR, payload: err.response.data });
    });
};

// List Clients
export const ClientsList = () => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(getCurrentHost() + "client/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CLIENTS_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

// get client
export const getClientDetails = (id) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(getCurrentHost() + "client/" + id, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CLIENT_DETAIL_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

// Add Client
export const createClient = (data) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .post(getCurrentHost() + "client/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CREATE_CLIENT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

// Update Client
export const updateClient = (data) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .put(getCurrentHost() + "client/update/" + data?.id, data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: UPDATE_CLIENT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

// DELETE Client
export const deleteClient = (id) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .delete(getCurrentHost() + "client/delete/" + id, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: DELETE_CLIENT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

// Create requirement request
export const RequirementRequestList = (data) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(getCurrentHost() + "requirement/request/list", {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: REQUIREMENT_REQUEST_LIST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

export const getRequestRequirement = (data) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(getCurrentHost() + `requirement/request/${data}`, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: GET_REQUIREMENT_REQUEST_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

// Create requirement request
export const createRequirementRequest = (data) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .post(getCurrentHost() + "requirement/request/create", data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: CREATE_REQUIREMENT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};

// Create requirement request
export const updateRequirementRequest = (data) => async (dispatch) => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .put(getCurrentHost() + `requirement/request/update/${data.id}`, data, {
      headers: authHeader(true),
    })
    .then((res) => {
      if (res.data) {
        dispatch({ type: UPDATE_REQUIREMENT_SUCCESS, payload: res.data });
      } else {
        throwError(res);
        dispatch({ type: PROJECT_ERROR, payload: res.data.message });
      }
    })
    .catch((err) => {
      throwError(err.response);
      dispatch({ type: PROJECT_ERROR, payload: err.response.data });
    });
};
