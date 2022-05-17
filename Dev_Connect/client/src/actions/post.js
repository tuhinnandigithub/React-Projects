import axios from 'axios';
import { GET_POSTS, POSTS_ERROR, PROFILE_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST ,GET_POST, ADD_COMMENT,REMOVE_COMMENT} from './types';
import { setAlert } from './alert';

//Get Posts

export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get('/api/posts');

        dispatch({
            type : GET_POSTS,
            payload : res.data
        });
    }catch(err){
        dispatch({
            type : POSTS_ERROR,
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


//Delete Post

export const deletePost = postId => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/${postId}`)

        dispatch({
            type : DELETE_POST,
            payload : postId
        });

        dispatch(setAlert('Post Deleted', 'success'));
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText, status : err.response.status}
        });
    }
};


//Add Post

export const addPost = formData => async dispatch => {

    const config = {
        headers : {
            "Content-Type" : 'application/json'
        }
    }
    try{
        const res = await axios.post('/api/posts', formData, config)

        dispatch({
            type : ADD_POST,
            payload : res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText, status : err.response.status}
        });
    }
};

//Get Post

export const getPost = postId => async dispatch => {
    try{
        const res = await axios.get(`/api/post/${postId}`);

        dispatch({
            type : GET_POST,
            payload : res.data
        });
    }catch(err){
        dispatch({
            type : POSTS_ERROR,
            payload : {msg : err.response.statusText, status : err.response.status}
        });
    }
};

//Add Comment

export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers : {
            "Content-Type" : 'application/json'
        }
    }
    try{
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)

        dispatch({
            type : ADD_COMMENT,
            payload : res.data
        });

        dispatch(setAlert('Comment Added', 'success'));
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText, status : err.response.status}
        });
    }
};

//Add Comment

export const deleteComment = (postId, commentId) => async dispatch => {

    const config = {
        headers : {
            "Content-Type" : 'application/json'
        }
    }
    try{
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

        dispatch({
            type : REMOVE_COMMENT,
            payload : commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText, status : err.response.status}
        });
    }
};

