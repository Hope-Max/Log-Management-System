import axios from "axios";
import {SHIFT_CANCEL_ERROR, SHIFT_CANCEL_LOADING, SHIFT_CANCEL_SUCCESS } from './types';
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
export const cancelShift = (data) => async (dispatch) => {
    dispatch({type: SHIFT_CANCEL_LOADING});
    axios
        .post(getCurrentHost() + "remove-shift", data, {
            headers: authHeader(true),
        })
        .then(response => {
            if(response.data.status){
                dispatch({type: SHIFT_CANCEL_SUCCESS, payload: response.data});
            }else{
                throwError(response);
                dispatch({type: SHIFT_CANCEL_ERROR, payload: response.data});
            }
        })
        .catch(error => {
            dispatch({type: SHIFT_CANCEL_ERROR, payload: error.response});
        });
}