import { isEmpty } from "../constants";
import {
  SET_CURRENT_USER,
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  REGISTER_STEP2_ERROR,
  DELETE_USER_SUCCESS,
  REGISTER_STEP2_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  UPDATE_USER_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_ERROR,
  SET_INITIAL_AUTH,
  USER_RESET_PASSWORD_SUCCESS,
} from "./../actions/types";
const initialState = {
  isAuthenticated: false,
  createUserSuccess: {},
  forgotLinkSuccess: {},
  newPasswordSuccess: {},
  forgotLinkError: {},
  getUserById: {},
  updateUserSuccess: {},
  deleteUserRes: {},
  user: {},
  error: {},
  loading: false,
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      };
    case SET_INITIAL_AUTH:
      return initialState;
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
        error: {},
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: {},
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotLinkSuccess: action.payload,
        error: {},
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotLinkError: action.payload,
        error: {},
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPasswordSuccess: action.payload,
        error: {},
      };
    case USER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newUserPasswordSuccess: action.payload,
        error: {},
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        createUserSuccess: action.payload,
        error: {},
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        getUserById: action.payload,
        error: {},
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteUserRes: action.payload,
        error: {},
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        getUserById: {},
        error: action.payload,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        createUserSuccess: {},
        error: action.payload,
      };
    case REGISTER_STEP2_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: {},
      };
    case REGISTER_STEP2_ERROR:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateUserSuccess: action.payload,
        error: {},
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        updateUserSuccess: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
