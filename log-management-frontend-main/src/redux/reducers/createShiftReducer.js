import {
	CRAETE_SHIFT_LOADING,
	CRAETE_SHIFT_SUCCESS,
	CRAETE_SHIFT_ERROR
} from '../actions/types';

const initialState = {
	createShiftResp: {},
	error: {},
	loading: false
};

export default function createShiftReducer(state = initialState, action) {
	switch (action.type) {
		case	CRAETE_SHIFT_LOADING:
			return {
				...state,
				loading: true
			};
		case CRAETE_SHIFT_SUCCESS:
			return {
				...state,
				createShiftResp: action.payload,
				loading: false,
			};
		case CRAETE_SHIFT_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}