import {
    ADD_COMMENT,
    CHANGE_COMMENT_DATA,
    CLOSE_ADD_COMMENT,
    EMPTY_ADD_COMMENT,
    PREPARE_ADD_COMMENT,
    RECEIVE_COMMENTS,
    REMOVE_COMMENT,
    SET_CURRENT_COMMENT,
    UPDATE_COMMENT,
    VOTE_COMMENT
} from '../types'
import * as CommentApi from '../../api/CommentApi'

export function prepareAddComment() {
    return {type: PREPARE_ADD_COMMENT}
}

export function closeAddComment() {
    return {type: CLOSE_ADD_COMMENT}
}

export function registerChangeData(commentId, data) {
    return {type: CHANGE_COMMENT_DATA, commentId: commentId, data: data}
}

export function emptyAddComment() {
    return {type: EMPTY_ADD_COMMENT}
}

export function receiveComments(data, id) {
    return {type: RECEIVE_COMMENTS, comments: data, postId: id}
}

export function voteComment(option, comment) {
    return {type: VOTE_COMMENT, option: option, comment}
}

export function setCurrentComment(commentId) {
    return {type: SET_CURRENT_COMMENT, commentId: commentId}
}

export function addComment(comment) {
    return {type: ADD_COMMENT, comment}
}

export function updateComment(comment) {
    return {type: UPDATE_COMMENT, comment}
}

export function removeComment({id, postId}) {
    return {type: REMOVE_COMMENT, id, postId}
}

export const saveComment = (comment) => dispatch => {
    return CommentApi
        .add(comment)
        .then(data => dispatch(addComment(data)))
}

export const deleteComment = (id, postId) => dispatch => (
    CommentApi
        .deleteComment(id)
        .then(data => dispatch(removeComment({id, postId})))
)

export const ratingComment = (option, comment) => dispatch => (
    CommentApi
        .ratingComment(comment.id, option)
        .then(data => dispatch(voteComment(option, data)))
)

export const editComment = (comment) => dispatch => (
    CommentApi
        .update(comment)
        .then(data => dispatch(updateComment(data)))
)


//Posts
export const getCommentsByPost = (id) => dispatch => (
    CommentApi
        .getCommentsByPost(id)
        .then((data) => dispatch(receiveComments(data, id)))
)