import {
	EXPENSE_ERROR,
	EXPENSE_LOADING,
	ADD_EXPENSE_SUCCESS,
	SET_INITIAL_EXPENSE,
	EXPENSE_LIST_SUCCESS,
	UPDATE_EXPENSE_SUCCESS
} from '../actions/types';

const initialState = {
	addExpenseSuccess: {},
	expenseListData: [],
	updateExpenseSuccess: {},
	error: {},
	loading: false
};

export default function expenseReducer(state = initialState, action) {
	switch (action.type) {
		case EXPENSE_LOADING:
			return {
				...state,
				loading: true
			};
		case ADD_EXPENSE_SUCCESS:
			return {
				...state,
				addExpenseSuccess: action.payload,
				loading: false
			};
		case EXPENSE_LIST_SUCCESS:
			return {
				...state,
				expenseListData: action.payload,
				loading: false
			};
		case UPDATE_EXPENSE_SUCCESS:
			return {
				...state,
				updateExpenseSuccess: action.payload,
				loading: false
			};
		case EXPENSE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case SET_INITIAL_EXPENSE:
			return {
				addExpenseSuccess: {},
				error: {},
				loading: false
			};
		default:
			return state;
	}
}
