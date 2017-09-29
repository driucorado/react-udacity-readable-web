import * as CommentAPI from '../../api/CommentAPI'

export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const CHANGE_BODY_COMMENT = "CHANGE_BODY_COMMENT"
export const PREPARE_ADD_COMMENT = "PREPARE_ADD_COMMENT"
export const SET_CURRENT_COMMENT = "SET_CURRENT_COMMENT"
export const EMPTY_ADD_COMMENT = "EMPTY_ADD_COMMENT"
export const VOTE_COMMENT = "VOTE_COMMENT"

export function emptyAddComment() {
	return {type: EMPTY_ADD_COMMENT}
	// body...
}

export function voteComment(option, comment) {
	return {type: VOTE_COMMENT, option: option, comment}
}

export function setCurrentComment(comment) {
	return {type: SET_CURRENT_COMMENT, comment}
}

export function changeBody(body) {
	return {type:CHANGE_BODY_COMMENT, body:body}
}

export function addComment(comment) {
	return {type:ADD_COMMENT, comment}
}

export function updateComment(comment) {
	return {type:UPDATE_COMMENT, comment}
}

export function removeComment({id}) {
	return {type:REMOVE_COMMENT, id}
}

export function prepareAddComment(postId) {
	return {type:PREPARE_ADD_COMMENT, postId:postId}
}

export const saveComment = (comment) => dispatch => {
	return CommentAPI
	.add(comment)
	.then(data => dispatch(addComment(data)))
}

export const deleteComment = (id) => dispatch => (
	CommentAPI
	.deleteComment(id)
	.then(data => dispatch(removeComment(data)))
)

export const ratingComment = (option, comment) => dispatch => (
	CommentAPI
	.ratingComment(comment.id, option)
	.then(data => dispatch(voteComment(option,data)))
)

export const editComment = (comment) => dispatch => (
	CommentAPI
	.update(comment)
	.then(data => dispatch(updateComment(data)))
)
