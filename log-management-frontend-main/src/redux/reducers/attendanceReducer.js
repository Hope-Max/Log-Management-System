import {
    ATTENDANCE_LOADING,
    USERS_ATTENDANCE_SUCCESS,
    ATTENDANCE_ERROR
} from '../actions/types'

const initialState = {
    loading: false,
    usersAttendance: [],
    error: {}
}

export default function attendanceReducer(state = initialState, action) {
    switch (action.type) {
        case ATTENDANCE_LOADING:
            return {
                ...state,
                loading: true
            }
        case USERS_ATTENDANCE_SUCCESS:
            return {
                ...state,
                usersAttendance: action.payload,
                loading: false
            }
        case ATTENDANCE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default: return state
    }
}