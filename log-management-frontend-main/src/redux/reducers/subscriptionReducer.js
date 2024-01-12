import { BILLING_DETAIL_SUCCESS, BILLING_HISTORY_SUCCESS, BILLING_INFO_SUCCESS, CANCEL_RENEWAL_SUCCESS, CLEAR_SUBSCRIPTION_DATA, CREATE_CARD_ERROR, CREATE_CARD_SUCCESS, PAY_BY_CARD_ERROR, PAY_BY_CARD_SUCCESS, PREMIUM_SUBSCRIPTION_SUCCESS, REMOVE_CARD_SUCCESS, SAVE_DETAIL_ERROR, SAVE_DETAIL_SUCCESS, SUBSCRIPTION_ERROR, SUBSCRIPTION_LIST_SUCCESS, SUBSCRIPTION_LOADING, UPDATE_CARD_SUCCESS } from '../actions/types';

const initialState = {
  subscriptionListData: {},
  cancelRenewalRes: {},
  billingDetailRes: {},
  createCardRes: {},
  saveDetailRes: {},
  payByCardRes: {},
  billingInfoRes: {},
  billingHistoryRes: {},
  premiumSubscriptionRes: {},
  updateBranchRes: {},
  createCardErr: {},
  saveDetailErr: {},
  updateCardRes:{},
  removeCardRes: {},
  payByCardErr: {},
  error: {},
  loading: false,
};

export default function subscriptionReducer(state = initialState, action) {
	switch (action.type) {
    case SUBSCRIPTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIPTION_LIST_SUCCESS:
      return {
        ...state,
        subscriptionListData: action.payload,
        loading: false,
      };
    case CANCEL_RENEWAL_SUCCESS:
      return {
        ...state,
        cancelRenewalRes: action.payload,
        loading: false,
      };
    case PREMIUM_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        premiumSubscriptionRes: action.payload,
        loading: false,
      };
    case BILLING_HISTORY_SUCCESS:
      return {
        ...state,
        billingHistoryRes: action.payload,
        loading: false,
      };
    case BILLING_INFO_SUCCESS:
      return {
        ...state,
        billingInfoRes: action.payload,
        loading: false,
      };
    case PAY_BY_CARD_SUCCESS:
      return {
        ...state,
        payByCardRes: action.payload,
        payByCardErr: {},
        createCardRes: {},
        createCardErr: {},
        saveDetailRes: {},
        saveDetailErr: {},
        loading: false,
      };
    case PAY_BY_CARD_ERROR:
      return {
        ...state,
        payByCardRes: {},
        payByCardErr: action.payload,
        createCardRes: {},
        createCardErr: {},
        saveDetailRes: {},
        saveDetailErr: {},
        loading: false,
      };
    case SAVE_DETAIL_SUCCESS:
      return {
        ...state,
        saveDetailRes: action.payload,
        saveDetailErr: {},
        loading: false,
      };
    case SAVE_DETAIL_ERROR:
      return {
        ...state,
        saveDetailRes: {},
        saveDetailErr: action.payload,
        loading: false,
      };
    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        createCardRes: action.payload,
        createCardErr: {},
        saveDetailRes: {},
        saveDetailErr: {},
        loading: false,
      };
    case REMOVE_CARD_SUCCESS:
      return {
        ...state,
        removeCardRes: action.payload,
        loading: false,
      };
    case CREATE_CARD_ERROR:
      return {
        ...state,
        createCardRes: {},
        createCardErr: action.payload,
        saveDetailRes: {},
        saveDetailErr: {},
        loading: false,
      };
    case BILLING_DETAIL_SUCCESS:
      return {
        ...state,
        billingDetailRes: action.payload,
        loading: false,
      };
    case SUBSCRIPTION_ERROR:
      return {
        ...state,
        updateBranchRes: action.payload,
        loading: false,
      };
    case CLEAR_SUBSCRIPTION_DATA:
      return {
        ...state,
        payByCardRes: {},
        payByCardErr: {},
        createCardRes: {},
        createCardErr: {},
        saveDetailRes: {},
        saveDetailErr: {},
        loading: false,
      };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        updateCardRes: action.payload,
        loading: false,
      };
    // case BILLING_INFO_DETAILS_SUCCESS:
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
    default:
      return state;
  }
}