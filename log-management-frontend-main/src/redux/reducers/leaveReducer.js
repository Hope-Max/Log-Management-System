import {
  CREATE_LEAVE_QUOTA_SUCCESS,
  LEAVE_QUOTA_LIST_SUCCESS,
  LEAVE_LOADING,
  SET_INITIAL_LEAVE,
  LEAVE_ERROR,
  LEAVE_TYPE_SUCCESS,
  LEAVE_REQUESTS_LIST_SUCCESS,
  CREATE_LEAVE_REQUEST_SUCCESS,
  UPDATE_LEAVE_REQUEST_SUCCESS,
  LEAVE_LIST_SUCCESS,
  HOLIDAYS_LIST_SUCCESS,
  CREATE_HOLIDAYS_SUCCESS,
  DELETE_HOLIDAYS_SUCCESS,
} from "../actions/types";

const initialState = {
  createLeaveQuotaSuccess: {},
  leaveQuotaList: [],
  leaveTypeData: [],
  leaveListData: [],
  leaveRequestsListData: [],
  holidaysListData: [],
  createHolidaySuccess: {},
  createLeaveRequestSuccess: {},
  updateLeaveRequestSuccess: {},
  deleteHolidaySuccess: {},
  error: {},
  loading: false,
};

export default function leaveReducer(state = initialState, action) {
  switch (action.type) {
    case LEAVE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_LEAVE_QUOTA_SUCCESS:
      return {
        ...state,
        createLeaveQuotaSuccess: action.payload,
        loading: false,
      };
    case LEAVE_QUOTA_LIST_SUCCESS:
      return {
        ...state,
        leaveQuotaList: action.payload,
        loading: false,
      };
    case CREATE_LEAVE_REQUEST_SUCCESS:
      return {
        ...state,
        createLeaveRequestSuccess: action.payload,
        loading: false,
      };
    case UPDATE_LEAVE_REQUEST_SUCCESS:
      return {
        ...state,
        updateLeaveRequestSuccess: action.payload,
        loading: false,
      };
    case HOLIDAYS_LIST_SUCCESS:
      return {
        ...state,
        holidaysListData: action.payload,
        loading: false,
      };
    case CREATE_HOLIDAYS_SUCCESS:
      return {
        ...state,
        createHolidaySuccess: action.payload,
        loading: false,
      };
    case DELETE_HOLIDAYS_SUCCESS:
      return {
        ...state,
        deleteHolidaySuccess: action.payload,
        loading: false,
      };
    case LEAVE_LIST_SUCCESS:
      return {
        ...state,
        leaveListData: action.payload,
        loading: false,
      };
    case LEAVE_REQUESTS_LIST_SUCCESS:
      return {
        ...state,
        leaveRequestsListData: action.payload,
        loading: false,
      };
    case SET_INITIAL_LEAVE:
      return {
        ...state,
        createLeaveRequestSuccess: {},
        updateLeaveRequestSuccess: {},
        createLeaveQuotaSuccess: {},
        leaveQuotaList: [],
        error: {},
        loading: false,
      };
    case LEAVE_TYPE_SUCCESS:
      return {
        ...state,
        leaveTypeData: action.payload,
        loading: false,
      };
    case LEAVE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
