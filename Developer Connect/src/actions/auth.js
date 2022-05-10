import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_FAIL,REGISTER_SUCCESS, AUTH_ERROR,USER_LOADED,LOGIN_SUCCESS,LOGIN_FAIL } from "./types";
import setAuthToken from "../utils/setAuthToken";
//Load User

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.post();

        dispatch({
            type: USER_LOADED,
            payload : res.data
        });
    }catch{
        dispatch({
            type: AUTH_ERROR,
        })
    }
}
//Register User

export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password})

    try{
        const res = await axios.post('http://restapi.adequateshop.com/api/authaccount/registration', body, config);
        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        });

        dispatch(loadUser());
    }catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(err.message, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


//LogIn User

export const login = ({email, password}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email,password})

    try{
        const res = await axios.post('http://restapi.adequateshop.com/api/authaccount/registration', body, config);
        dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data
        });

        dispatch(loadUser());
    }catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(err.message, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}