import axios from "axios";
import {ACCEPT_NEGOTIATION_ERROR, ACCEPT_NEGOTIATION_LOADING, ACCEPT_NEGOTIATION_SUCCESS } from './types';
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
export const acceptNEgotiation = (data) => async (dispatch) => {
    dispatch({type: ACCEPT_NEGOTIATION_LOADING});
    axios
        .post(getCurrentHost() + "action-for-negoitate-accept", data, {
            headers: authHeader(true),
        })
        .then(response => {
            if(response.data.status){
                dispatch({type: ACCEPT_NEGOTIATION_SUCCESS, payload: response.data});
            }else{
                throwError(response);
                dispatch({type: ACCEPT_NEGOTIATION_ERROR, payload: response.data});
            }
        })
        .catch(error => {
            dispatch({type: ACCEPT_NEGOTIATION_ERROR, payload: error.response});
        });
}