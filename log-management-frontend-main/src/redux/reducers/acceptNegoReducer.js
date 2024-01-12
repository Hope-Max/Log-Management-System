import {
	ACCEPT_NEGOTIATION_ERROR, ACCEPT_NEGOTIATION_LOADING, ACCEPT_NEGOTIATION_SUCCESS
} from '../actions/types';

const initialState = {
	acceptNegoSuccess: {},
	error: {},
	loading: false
};

export default function acceptNegoReducer(state = initialState, action) {
	switch (action.type) {
		case ACCEPT_NEGOTIATION_LOADING:
			return {
				...state,
				loading: true
			};
		case ACCEPT_NEGOTIATION_SUCCESS:
			return {
				...state,
				acceptNegoSuccess: action.payload,
				loading: false,
			};
		case ACCEPT_NEGOTIATION_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}