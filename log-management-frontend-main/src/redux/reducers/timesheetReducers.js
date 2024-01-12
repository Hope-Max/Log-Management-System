import {
    CHECK_IN_LOADING,
    CHECK_IN_SUCCESS,
    CHECK_IN_ERROR,
    CHECK_OUT_LOADING,
    CHECK_OUT_SUCCESS,
    CHECK_OUT_ERROR,

    TIMELOGS_LOADING,
    TIMELOGS_TODAY_SUCCESS,
    TIMELOGS_WEEK_SUCCESS,
    TIMELOGS_MONTH_SUCCESS,
    TIMELOGS_ERROR,

    UPDATE_HOURS_LOADING,
    UPDATE_HOURS_SUCCESS,
    UPDATE_HOURS_ERROR,

    EMPLOYEE_CREATE_TIMELOGS_SUCCESS,
    EMPLOYEE_LIST_TIMELOGS_SUCCESS,
    EMPLOYEE_UPDATE_TIMELOGS_SUCCESS,
    EMPLOYEE_UPDATE_HOURS_SUCCESS,
    EMPLOYEE_DELETE_TIMELOG_SUCCESS
} from '../actions/types'

const initialState = {
    loading: false,
    timelogToday: [],
    timelogsWeek: [],
    timelogsMonth: [],
    employeeTimelogs: [],
    empUpdateHoursSuccess: [],
    empTimelogDeleteSuccess: {},
    error: {}
}

export default function timesheetReducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_IN_LOADING:
            return {
                ...state,
                loading: true
            }
        case CHECK_IN_SUCCESS:
            return {
                ...state,
                timelogToday: action.payload,
                loading: false
            }
        case CHECK_IN_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CHECK_OUT_LOADING:
            return {
                ...state,
                loading: true
            }
        case CHECK_OUT_SUCCESS:
            return {
                ...state,
                timelogToday: action.payload,
                loading: false
            }
        case CHECK_OUT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case TIMELOGS_LOADING:
            return {
                ...state,
                loading: true
            }
        case TIMELOGS_TODAY_SUCCESS:
            return {
                ...state,
                timelogToday: action.payload,
                loading: false
            }
        case TIMELOGS_WEEK_SUCCESS:
            return {
                ...state,
                timelogsWeek: action.payload,
                loading: false
            }
        case TIMELOGS_MONTH_SUCCESS:
            return {
                ...state,
                timelogsMonth: action.payload,
                loading: false
            }
        case TIMELOGS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case UPDATE_HOURS_LOADING:
            return {
                ...state,
                loading: true
            }
        case UPDATE_HOURS_SUCCESS:
            return {
                ...state,
                timelogs: action.payload,
                loading: false
            }
        case UPDATE_HOURS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case EMPLOYEE_CREATE_TIMELOGS_SUCCESS:
            return {
                ...state,
                employeeTimelogs: action.payload,
                loading: false
            }
        case EMPLOYEE_LIST_TIMELOGS_SUCCESS:
            return {
                ...state,
                employeeTimelogs: action.payload,
                loading: false
            }
        case EMPLOYEE_UPDATE_TIMELOGS_SUCCESS:
            return {
                ...state,
                employeeTimelogs: action.payload,
                loading: false
            }
        case EMPLOYEE_UPDATE_HOURS_SUCCESS:
            return {
                ...state,
                empUpdateHoursSuccess: action.payload,
                loading: false
            }
        case EMPLOYEE_DELETE_TIMELOG_SUCCESS:
            return {
                ...state,
                empTimelogDeleteSuccess: action.payload,
                loading: false
            }
        default:
            return state
    }
}