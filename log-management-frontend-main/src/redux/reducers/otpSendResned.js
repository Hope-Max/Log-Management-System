import { RESEND_OTP_LOADING, RESEND_OTP_SUCCESS, RESEND_OTP_ERROR } from '../actions/types';
import { isEmpty } from '../constants';
const initialState = {
	isAuthenticated: false,
	user: {},
	error: {},
	loading: false
};
export default function otpSendResend(state = initialState, action) {
	switch (action.type) {
		case RESEND_OTP_LOADING:
			return {
				...state,
				loading: true
			};
		case RESEND_OTP_SUCCESS:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
				loading: false,
				error: {}
			};
		case RESEND_OTP_ERROR:
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
