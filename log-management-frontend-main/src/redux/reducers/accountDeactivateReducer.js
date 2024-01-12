import {
	ACCOUNT_DEACTIVATE_ERROR, ACCOUNT_DEACTIVATE_LOADING, ACCOUNT_DEACTIVATE_SUCCESS
} from '../actions/types';

const initialState = {
	deactivateSuccess: {},
	error: {},
	loading: false
};

export default function accountDeactivateReducer(state = initialState, action) {
	switch (action.type) {
		case ACCOUNT_DEACTIVATE_LOADING:
			return {
				...state,
				loading: true
			};
		case ACCOUNT_DEACTIVATE_SUCCESS:
			return {
				...state,
				deactivateSuccess: action.payload,
				loading: false,
			};
		case ACCOUNT_DEACTIVATE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}