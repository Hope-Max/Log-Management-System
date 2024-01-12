import {
    PAYROLL_LOADING,
    ALL_USERS_PAYROLL_MONTHLY_SUCCESS,
    PAYROLL_MONTHLY_SUCCESS,
    PAYROLL_ERROR
} from '../actions/types'

const initial_state = {
    loading: false,
    all_users_monthly_payroll: [],
    user_monthly_payroll: {},
    error: {}
}

export default function payrollReducer(state = initial_state, action) {
    switch (action.type) {
        case PAYROLL_LOADING:
            return {
                ...state,
                loading: true
            }
        case ALL_USERS_PAYROLL_MONTHLY_SUCCESS:
            return {
                ...state,
                all_users_monthly_payroll: action.payload,
                loading: false
            }
        case PAYROLL_MONTHLY_SUCCESS:
            return {
                ...state,
                user_monthly_payroll: action.payload,
                loading: false
            }
        case PAYROLL_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}