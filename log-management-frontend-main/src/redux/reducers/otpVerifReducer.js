import { REGISTER_OTP_LOADING, REGISTER_OTP_SUCCESS, REGISTER_OTP_ERROR } from '../actions/types';
import { isEmpty } from '../constants';
const initialState = {
	isAuthenticated: false,
	user: {},
	error: {},
	loading: false
};
export default function otpVerifyReducer(state = initialState, action) {
	switch (action.type) {
		case REGISTER_OTP_LOADING:
			return {
				...state,
				loading: true
			};
		case REGISTER_OTP_SUCCESS:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
				loading: false,
				error: {}
			};
		case REGISTER_OTP_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				user: {}
			};
		default:
			return state;
	}
}
