import {
    ORGANIZATION_API_ERROR,
    ORGANIZATION_API_LOADING,
    CREATE_DESIGNATION_SUCCESS,
    CREATE_ASSET_SUCCESS,
    DESIGNATION_LIST_SUCCESS,
    DESIGNATION_UPDATE_SUCCESS,
    ASSET_LIST_SUCCESS,
    ORGANIZATION_EXPENSE_LIST_SUCCESS,
    UPDATE_ASSET_SUCCESS,
    SET_INITIAL_ORGANIZATION,
    DESIGNATION_DELETE_SUCCESS,
    DELETE_ASSET_SUCCESS
} from '../actions/types';

const initialState = {
    createDesignationSuccess: {},
    createAssetSuccess: {},
    error: {},
    loading: false,
    updateAssetSuccess: {},
    updateDesignationSuccess: {},
    deleteDesignationSuccess: {},
    deleteAssetSuccess: {},
    designationListData: [],
    assetListData: [],
    organizationExpenseListData: []
};

export default function organizationReducer(state = initialState, action) {
    switch (action.type) {
        case ORGANIZATION_API_LOADING:
            return {
                ...state,
                loading: true
            };
        case CREATE_DESIGNATION_SUCCESS:
            return {
                ...state,
                createDesignationSuccess: action.payload,
                loading: false
            };
        case CREATE_ASSET_SUCCESS:
            return {
                ...state,
                createAssetSuccess: action.payload,
                loading: false
            };
        case DESIGNATION_LIST_SUCCESS:
            return {
                ...state,
                designationListData: action.payload,
                loading: false
            };
        case DESIGNATION_UPDATE_SUCCESS:
            return {
                ...state,
                updateDesignationSuccess: action.payload,
                loading: false
            }
        case DESIGNATION_DELETE_SUCCESS: {
            return {
                ...state,
                deleteDesignationSuccess: action.payload,
                loading: false
            }
        }
        case ASSET_LIST_SUCCESS:
            return {
                ...state,
                assetListData: action.payload,
                loading: false
            };
        case ORGANIZATION_EXPENSE_LIST_SUCCESS:
            return {
                ...state,
                organizationExpenseListData: action.payload,
                loading: false
            };
        case UPDATE_ASSET_SUCCESS:
            return {
                ...state,
                updateAssetSuccess: action.payload,
                loading: false
            };
        case DELETE_ASSET_SUCCESS: {
            return {
                ...state,
                deleteAssetSuccess: action.payload,
                loading: false
            }
        }
        case ORGANIZATION_API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case SET_INITIAL_ORGANIZATION:
            return {
                ...state,
                createDesignationSuccess: {},
                createAssetSuccess: {},
                error: {},
                loading: false,
                updateAssetSuccess: {}
            };
        default:
            return state;
    }
}
