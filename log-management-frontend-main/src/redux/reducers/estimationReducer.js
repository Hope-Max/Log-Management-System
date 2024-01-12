import {
  ESTIMATION_LOADING,
  CREATE_BOQ_SUCCESS,
  BOQ_LIST_SUCCESS,
  ESTIMATION_ERROR,
  UPDATE_BILL_TABLE_ACTION,
  BOQ_BY_ID_SUCCESS,
  UPDATE_BOQ_SUCCESS,
  CREATE_PROCURE_SUCCESS,
} from "../actions/types";

const initialState = {
  create_boq_success: {},
  updateBillTableRes: {},
  updateBoqRes: {},
  boq_list: [],
  createProcureRes: {},
  boq_by_id: {},
  error: {},
  loading: false,
};

export default function createShiftReducer(state = initialState, action) {
  switch (action.type) {
    case ESTIMATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BOQ_SUCCESS:
      return {
        ...state,
        create_boq_success: action.payload,
        loading: false,
      };
    case UPDATE_BILL_TABLE_ACTION:
      return {
        ...state,
        updateBillTableRes: action.payload,
        loading: false,
      };
    case BOQ_LIST_SUCCESS:
      return {
        ...state,
        boq_list: action.payload,
        loading: false,
      };
    case BOQ_BY_ID_SUCCESS:
      return {
        ...state,
        boq_by_id: action.payload,
        loading: false,
      };
    case UPDATE_BOQ_SUCCESS:
      return {
        ...state,
        updateBoqRes: action.payload,
        loading: false,
      };
    case CREATE_PROCURE_SUCCESS:
      return {
        ...state,
        createProcureRes: action.payload,
        loading: false,
      };
    case ESTIMATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
