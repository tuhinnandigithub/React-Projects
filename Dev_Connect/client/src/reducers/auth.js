import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,ACCOUNT_DELETED} from '../actions/types';
const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    loading:true,
    user:null
}
export default function(state =initialState,action){
    const {type,payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:    
            //addding token from Local storage
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT :
        case ACCOUNT_DELETED:               
            //removing token from Local storage
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
            }
            
        case USER_LOADED:
            //Load user from token
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }     
        default:
            return state;
    }
}