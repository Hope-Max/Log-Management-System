import {
	RESPONSE_LOADING,
	RESPONSE_SUCCESS,
	RESPONSE_ERROR
} from '../actions/types';

const initialState = {
	data: {},
	error: {},
	loading: false
};

export default function resReducer(state = initialState, action) {
	switch (action.type) {
		case RESPONSE_LOADING:
			return {
				...state,
				loading: true
			};
		case RESPONSE_SUCCESS:
			return {
				...state,
				data: action.payload,
				loading: false,
			};
		case RESPONSE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}