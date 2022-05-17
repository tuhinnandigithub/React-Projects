import React,{useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {getPosts} from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({getPosts, post : {post, loading}, match}) => {

    useEffect(() => {
        getPosts(match.params.id);
    },[getPosts])
 
    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'> Back To Posts </Link>
        <PostItem post={post} showActions={false}/>
        <CommentForm postId={post._id} />
        <div className='comments'>
            {post.comments.map(comment => (
                <CommentItem key = {comment._id} comment = {comment} postId={post._id}/>
            ))}
        </div>
    </Fragment>
};

Post.propTypes = state => ({
    getPost : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    post : state.post
})

export default connect(mapStateToProps, {getPosts})(Post);