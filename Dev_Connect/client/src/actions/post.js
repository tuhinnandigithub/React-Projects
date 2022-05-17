import axios from 'axios';
import { GET_POSTS, POSTS_ERROR, PROFILE_ERROR, UPDATE_LIKES } from './types';

//Get Posts

export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get("/api/posts")

        dispatch({
            type : GET_POSTS,
            payload : res.data,
        });
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText, status : err.response.status}
        });
    }
};

//Add Likes

export const addLike = postId => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/like/${postId}`)

        dispatch({
            type : UPDATE_LIKES,
            payload : {postId, likes: res.data}
        });
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText, status : err.response.status}
        });
    }
};


//Remove Likes

export const removeLike = postId => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/like/${postId}`)

        dispatch({
            type : UPDATE_LIKES,
            payload : {postId, likes: res.data}
        });
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText, status : err.response.status}
        });
    }
};

