import {
  PROJECT_LOADING,
  CREATE_PROJECT_SUCCESS,
  PROJECT_ERROR,
  PROJECTS_LIST_SUCCESS,
  PROJECT_SHOW_SUCCESS,
  ASSIGN_USER_LOADING,
  ASSIGN_USER_SUCCESS,
  CLIENTS_LIST_SUCCESS,
  CREATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
  ASSIGN_USER_ERROR,
  CLIENT_DETAIL_SUCCESS,
  CREATE_REQUIREMENT_SUCCESS,
  UPDATE_REQUIREMENT_SUCCESS,
  REQUIREMENT_REQUEST_LIST_SUCCESS,
  GET_REQUIREMENT_REQUEST_SUCCESS,
} from "../actions/types";

const initialState = {
  createProjectSuccess: {},
  clientListData: [],
  clientData: {},
  createClientSuccess: {},
  requirementRequestListRes: [],
  updateClientSuccess: {},
  requirementRequestRes: {},
  deleteClientSuccess: {},
  project: {},
  projectsList: [],
  error: {},
  loading: false,
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        createProjectSuccess: action.payload,
        loading: false,
      };
    case PROJECTS_LIST_SUCCESS:
      return {
        ...state,
        projectsList: action.payload,
        loading: false,
      };
    case PROJECT_SHOW_SUCCESS:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ASSIGN_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ASSIGN_USER_SUCCESS:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case ASSIGN_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLIENTS_LIST_SUCCESS:
      return {
        ...state,
        clientListData: action.payload,
        loading: false,
      };
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        createClientSuccess: action.payload,
        loading: false,
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        updateClientSuccess: action.payload,
        loading: false,
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        deleteClientSuccess: action.payload,
        loading: false,
      };
    case CLIENT_DETAIL_SUCCESS:
      return {
        ...state,
        clientData: action.payload,
        loading: false,
      };
    case CREATE_REQUIREMENT_SUCCESS:
      return {
        ...state,
        createRequirementRes: action.payload,
        loading: false,
      };
    case UPDATE_REQUIREMENT_SUCCESS:
      return {
        ...state,
        updateRequirementRes: action.payload,
        loading: false,
      };
    case REQUIREMENT_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        requirementRequestListRes: action.payload,
        loading: false,
      };
    case GET_REQUIREMENT_REQUEST_SUCCESS:
      return {
        ...state,
        requirementRequestRes: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
