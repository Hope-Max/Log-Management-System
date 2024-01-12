import {
  COMMON_API_LOADING,
  CATEGORY_LIST_SUCCESS,
  JOB_ROLE_SUCCESS,
  CERTIFICATES_SUCCESS,
  LIST_USERS_SUCCESS,
  LOCUM_LIST_SUCCESS,
  COMMON_API_ERROR,
  BRANCH_LIST_SUCCESS,
  PROFILE_SUCCESS,
  ANALYTICS_LEFT_SUCCESS,
  ANALYTICS_RIGHT_SUCCESS,
  ANALYTICS_MONTHLY_SUCCESS,
  ANALYTICS_LOCUM_LIST_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  DOWNLOAD_IMAGE_SUCCESS,
  DASHBOARD_DATA_SUCCESS,
  PAYMENT_HISTORY_LIST_SUCCESS,
  CONNECTED_DEVICE_LIST_SUCCESS,
  EMPLOYEE_PROFILE_SUCCESS,
  SHOW_LOADER,
  HIDE_LOADER,
} from "../actions/types";

const initialState = {
  showLoader: false,
  categories: {},
  roles: {},
  usersList: [],
  certificates: {},
  branches: {},
  locums: {},
  profile: {},
  employeeProfile: {},
  error: {},
  analyticsLeft: {},
  analyticsRight: {},
  tickets: {},
  ticketDetails: {},
  customerList: {},
  assignSuccess: {},
  answerSuccess: {},
  monthlyAnalytics: {},
  partnerProfile: {},
  analyticsLocumList: {},
  partnerListData: {},
  companyListData: {},
  partnerReportListData: {},
  paymentHistoryListData: {},
  uploadImageRes: {},
  downloadImageRes: {},
  connectedDevicesList: {},
  commonApiError: {},
  dashData: {},
  loading: false,
};

export default function commonApiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        showLoader: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        showLoader: false,
      };
    case COMMON_API_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case JOB_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        loading: false,
      };
    case CERTIFICATES_SUCCESS:
      return {
        ...state,
        certificates: action.payload,
        loading: false,
      };
    case LIST_USERS_SUCCESS:
      return {
        ...state,
        usersList: action.payload,
        loading: false,
      };
    case BRANCH_LIST_SUCCESS:
      return {
        ...state,
        branches: action.payload,
        loading: false,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case LOCUM_LIST_SUCCESS:
      return {
        ...state,
        locums: action.payload,
        loading: false,
      };
    case ANALYTICS_LEFT_SUCCESS:
      return {
        ...state,
        analyticsLeft: action.payload,
        loading: false,
      };
    case ANALYTICS_RIGHT_SUCCESS:
      return {
        ...state,
        analyticsRight: action.payload,
        loading: false,
      };
    case DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        dashData: action.payload,
        loading: false,
      };
    case CONNECTED_DEVICE_LIST_SUCCESS:
      return {
        ...state,
        connectedDevicesList: action.payload,
        loading: false,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        upload: action.payload,
        loading: false,
      };
    case DOWNLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        downloadImageRes: action.payload,
        loading: false,
      };
    // case TICKET_CUSTOMER_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     customerList: action.payload,
    //     loading: false,
    //   };
    // case TICKET_ANSWER_SUCCESS:
    //   return {
    //     ...state,
    //     answerSuccess: action.payload,
    //     loading: false,
    //   };
    // case TICKET_ANSWER_RESET:
    //   return {
    //     ...state,
    //     answerSuccess: {},
    //     loading: false,
    //   };
    case ANALYTICS_MONTHLY_SUCCESS:
      return {
        ...state,
        monthlyAnalytics: action.payload,
        loading: false,
      };
    // case PARTNER_PROFILE_DATA_SUCCESS:
    //   return {
    //     ...state,
    //     partnerProfile: action.payload,
    //     loading: false,
    //   };
    case ANALYTICS_LOCUM_LIST_SUCCESS:
      return {
        ...state,
        analyticsLocumList: action.payload,
        loading: false,
      };
    // case COMMON_API_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };
    case PAYMENT_HISTORY_LIST_SUCCESS:
      return {
        ...state,
        paymentHistoryListData: action.payload,
        loading: false,
      };
    // case COMPANY_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     companyListData: action.payload,
    //     loading: false,
    //   };
    // case PARTNER_REPORT_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     partnerReportListData: action.payload,
    //     loading: false,
    //   };
    case EMPLOYEE_PROFILE_SUCCESS:
      return {
        ...state,
        employeeProfile: action.payload,
        loading: false,
      };
    case COMMON_API_ERROR:
      return {
        ...state,
        error: action.payload,
        commonApiError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
