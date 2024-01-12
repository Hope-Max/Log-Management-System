import {
	SHIFT_CANCEL_ERROR, SHIFT_CANCEL_LOADING, SHIFT_CANCEL_SUCCESS
} from '../actions/types';

const initialState = {
	cancelShiftSuccess: {},
	error: {},
	loading: false
};

export default function cancelShiftReducer(state = initialState, action) {
	switch (action.type) {
		case SHIFT_CANCEL_LOADING:
			return {
				...state,
				loading: true
			};
		case SHIFT_CANCEL_SUCCESS:
			return {
				...state,
				cancelShiftSuccess: action.payload,
				loading: false,
			};
		case SHIFT_CANCEL_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}