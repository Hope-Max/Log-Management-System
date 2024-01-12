import axios from "axios";
import {ACCOUNT_DEACTIVATE_ERROR, ACCOUNT_DEACTIVATE_LOADING, ACCOUNT_DEACTIVATE_SUCCESS } from './types';
import {getCurrentHost} from "../constants/index";
import { authHeader } from './authHeader';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//Error function
export function throwError (response) {
     return toast.error(response.data.message, {
                    position: "top-right",
                    toastId: "1",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
}

// Shift create
export const accountDeactivate = (data) => async (dispatch) => {
    dispatch({type: ACCOUNT_DEACTIVATE_LOADING});
    axios
        .post(getCurrentHost() + "delete-account", data, {
            headers: authHeader(true),
        })
        .then(response => {
            if(response.data.status){
                dispatch({type: ACCOUNT_DEACTIVATE_SUCCESS, payload: response.data});
            }else{
                throwError(response);
                dispatch({type: ACCOUNT_DEACTIVATE_ERROR, payload: response.data});
            }
        })
        .catch(error => {
            toast.error(error.response.data.message);
            dispatch({type: ACCOUNT_DEACTIVATE_ERROR, payload: error.response});
        });
}