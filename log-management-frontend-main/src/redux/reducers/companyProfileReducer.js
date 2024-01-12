import {
	COMPANY_PROFILE_LOADING,
    UPDATE_PROFILE_SUCCESS,
    COMPANY_PROFILE_ERROR,
	CRAETE_BRANCH_SUCCESS,
	UPDATE_BRANCH_SUCCESS
} from '../actions/types';

const initialState = {
	updateResponse: {},
	createBranchRes: {},
	updateBranchRes: {},
	error: {},
	loading: false
};

export default function companyProfileReducer(state = initialState, action) {
	switch (action.type) {
		case COMPANY_PROFILE_LOADING:
			return {
				...state,
				loading: true
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				updateResponse: action.payload,
				loading: false,
			};
		case CRAETE_BRANCH_SUCCESS:
			return {
				...state,
				createBranchRes: action.payload,
				loading: false,
			};
		case UPDATE_BRANCH_SUCCESS:
			return {
				...state,
				updateBranchRes: action.payload,
				loading: false,
			};
		// case SKILL_SUCCESS:
		// 	return {
		// 		...state,
		// 		skills: action.payload,
		// 		loading: false,
		// 	};
		// case BRANCH_LIST_SUCCESS:
		// 	return {
		// 		...state,
		// 		branches: action.payload,
		// 		loading: false,
		// 	};
		// case PROFILE_SUCCESS:
		// 	return {
		// 		...state,
		// 		profile: action.payload,
		// 		loading: false,
		// 	};
		case COMPANY_PROFILE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}