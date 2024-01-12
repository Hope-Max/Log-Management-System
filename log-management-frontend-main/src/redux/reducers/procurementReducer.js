import {
  PROCUREMENT_LOADING,
  CREATE_VENDOR_SUCCESS,
  PROCUREMENT_ERROR,
  VENDOR_SHOW_SUCCESS,
  VENDORS_LIST_SUCCESS,
  UPDATE_VENDOR_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  PRODUCTS_LIST_SUCCESS,
  PRODUCT_DETAIL_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  PROCUREMENT_REQUIREMENT_SUCCESS,
  DOES_VENDOR_EXIST,
  VENDOR_LOGIN_SUCCESS,
  SEND_OTP_SUCCESS,
  VERIFY_OTP_SUCCESS,
  CREATE_RFQ_SUCCESS,
  RFQ_BY_ID_SUCCESS,
  UPDATE_RFQ_SUCCESS,
  RFQ_LIST_SUCCESS,
  RFQ_BY_PROJECT_SUCCESS,
  CLOSE_RFQ_SUCCESS,
  WANT_TO_BID,
  VENDOR_RFQ_LIST_SUCCESS,
  LIST_INTENT_SUCCESS,
  VENDOR_BID_ITEMS_SUCCESS,
  ADD_BID_ITEM_SUCCESS,
  REMOVE_BID_ITEM_SUCCESS,
  UPDATE_INTENT_TO_BID,
  GET_INTENT_SUCCESS,
  UPDATE_INTENT_SUCCESS,
  CRATE_PURCHASE_ORDER_SUCCESS,
} from "../actions/types";

const initialState = {
  createVendorSuccess: {},
  updateVendorSuccess: {},
  productsListData: [],
  productData: {},
  createProductSuccess: {},
  procurement_Requirement_List: [],
  updateProductSuccess: {},
  deleteProductSuccess: {},
  doesVendorExist: {},
  removeBidItemRes: {},
  updateIntentRes: {},
  addBidItemRes: {},
  vendorData: {},
  intentListRes: [],
  vendorsList: [],
  getIntentRes: {},
  updateRealIntentRes: {},
  vendorBidItemRes: [],
  otpSendSuccess: {},
  otpVerifySuccess: {},
  createPurchaseOrderRes: {},
  rfqData: {},
  rfqList: [],
  vendorRfqs: [],
  vendorWantsToBidSuccess: {},
  error: {},
  loading: false,
};

export default function procurementReducer(state = initialState, action) {
  switch (action.type) {
    case PROCUREMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_VENDOR_SUCCESS:
      return {
        ...state,
        createVendorSuccess: action.payload,
        loading: false,
      };
    case VENDORS_LIST_SUCCESS:
      return {
        ...state,
        vendorsList: action.payload,
        loading: false,
      };
    case VENDOR_SHOW_SUCCESS:
      return {
        ...state,
        vendorData: action.payload,
        loading: false,
      };
    case UPDATE_VENDOR_SUCCESS:
      return {
        ...state,
        updateVendorSuccess: action.payload,
        loading: false,
      };
    case PROCUREMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case PRODUCTS_LIST_SUCCESS:
      console.log("PRODUCTS_LIST_SUCCESS", action);
      return {
        ...state,
        productsListData: action.payload,
        loading: false,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProductSuccess: action.payload,
        loading: false,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updateProductSuccess: action.payload,
        loading: false,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductSuccess: action.payload,
        loading: false,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productData: action.payload,
        loading: false,
      };
    case PROCUREMENT_REQUIREMENT_SUCCESS:
      return {
        ...state,
        procurement_Requirement_List: action.payload,
        loading: false,
      };
    case DOES_VENDOR_EXIST:
      return {
        ...state,
        doesVendorExist: action.payload,
        loading: false,
      };
    case VENDOR_LOGIN_SUCCESS:
      return {
        ...state,
        vendorData: action.payload,
        loading: false,
      };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        otpSendSuccess: action.payload,
        loading: false,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpVerifySuccess: action.payload,
        loading: false,
      };
    case CREATE_RFQ_SUCCESS:
    case RFQ_BY_ID_SUCCESS:
    case UPDATE_RFQ_SUCCESS:
    case CLOSE_RFQ_SUCCESS:
      return {
        ...state,
        rfqData: action.payload,
        loading: false,
      };
    case RFQ_LIST_SUCCESS:
    case RFQ_BY_PROJECT_SUCCESS:
      return {
        ...state,
        rfqList: action.payload,
        loading: false,
      };
    case VENDOR_RFQ_LIST_SUCCESS:
      return {
        ...state,
        vendorRfqs: action.payload,
        loading: false,
      };
    case WANT_TO_BID:
      return {
        ...state,
        vendorWantsToBidSuccess: action.payload,
        loading: false,
      };
    case LIST_INTENT_SUCCESS:
      return {
        ...state,
        intentListRes: action.payload,
        loading: false,
      };
    case VENDOR_BID_ITEMS_SUCCESS:
      return {
        ...state,
        vendorBidItemRes: action.payload,
        loading: false,
      };
    case ADD_BID_ITEM_SUCCESS:
      return {
        ...state,
        addBidItemRes: action.payload,
        loading: false,
      };
    case REMOVE_BID_ITEM_SUCCESS:
      return {
        ...state,
        removeBidItemRes: action.payload,
        loading: false,
      };
    case UPDATE_INTENT_TO_BID:
      return {
        ...state,
        updateIntentRes: action.payload,
        loading: false,
      };
    case GET_INTENT_SUCCESS:
      return {
        ...state,
        getInstantRes: action.payload,
        loading: false,
      };
    case UPDATE_INTENT_SUCCESS:
      return {
        ...state,
        updateRealIntentRes: action.payload,
        loading: false,
      };
    case CRATE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        createPurchaseOrderRes: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
