import { GET_POSTS,POSTS_ERROR,UPDATE_LIKES } from "../actions/types"

const initialState = {
    posts : [],
    post : null,
    loading : true,
    error : {}
}

export default function(state=initialState, action){

    const {type, payload} = action;

    switch(type){
        case GET_POSTS: 
        return {
            ...state,
            posts: payload,
            loading : false
        };
        case POSTS_ERROR: 
        return {
            ...state,
            posts: payload,
            loading : false
        };
        default : 
        return state
    }
}

