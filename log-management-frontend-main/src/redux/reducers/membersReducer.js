import {
  MEMBER_LOADING,
  MEMBER_ERROR,
  LIST_JOB_POISTIONS_SUCCESS,
  CREATE_MEMBER_SUCCESS,
  DETAIL_MEMBER_SUCCESS,
  UPDATE_MEMBER_SUCCESS,
  REMOVE_MEMBER_SUCCESS,
  LIST_MEMBER_SUCCESS,
  CONNECTED_DEVICE_LIST_SUCCESS,
  UPDATE_ADDITIONAL_VERIFY_SUCCESS,
} from "../actions/types";

const initialState = {
  memberListData: {},
  createMemberRes: {},
  memberDetailRes: {},
  updateMemberRes: {},
  removeMemberRes: {},
  jobPositionsListRes: {},
  connectedDeviceListRes: {},
  updateAdditionalVerifyRes: {},
  premiumSubscriptionRes: {},
  updateBranchRes: {},
  createCardErr: {},
  saveDetailErr: {},
  payByCardErr: {},
  error: {},
  loading: false,
};

export default function membersReducer(state = initialState, action) {
	switch (action.type) {
    case MEMBER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LIST_MEMBER_SUCCESS:
      return {
        ...state,
        memberListData: action.payload,
        loading: false,
      };
    case CREATE_MEMBER_SUCCESS:
      return {
        ...state,
        createMemberRes: action.payload,
        loading: false,
      };
    case DETAIL_MEMBER_SUCCESS:
      return {
        ...state,
        memberDetailRes: action.payload,
        loading: false,
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        updateMemberRes: action.payload,
        loading: false,
      };
    case REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        removeMemberRes: action.payload,
        loading: false,
      };
    case LIST_JOB_POISTIONS_SUCCESS:
      return {
        ...state,
        jobPositionsListRes: action.payload,
        loading: false,
      };
    case CONNECTED_DEVICE_LIST_SUCCESS:
      return {
        ...state,
        connectedDeviceListRes: action.payload,
        loading: false,
      };
    case UPDATE_ADDITIONAL_VERIFY_SUCCESS:
      return {
        ...state,
        updateAdditionalVerifyRes: action.payload,
        loading: false,
      };
    case MEMBER_ERROR:
      return {
        ...state,
        updateBranchRes: action.payload,
        loading: false,
      };
    // case CLEAR_SUBSCRIPTION_DATA:
    //   return {
    //     ...state,
    //     payByCardRes: {},
    //     payByCardErr: {},
    //     createCardRes: {},
    //     createCardErr: {},
    //     saveDetailRes: {},
    //     saveDetailErr: {},
    //     loading: false,
    //   };
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
    default:
      return state;
  }
}