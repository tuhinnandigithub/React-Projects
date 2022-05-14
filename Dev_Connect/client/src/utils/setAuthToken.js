import axios from 'axios';

const setAuthToken = token =>{
    // If the token is present create a global header with set the token
    // so that on evry request this token goes along with the request
    // else delete that token from global header
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;