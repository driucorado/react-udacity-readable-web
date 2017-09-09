export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function addComment({title, body, author, category}) {
	return {type:ADD_POST, title, body, author, category}
}

export function updateComment({title, body, author, category, id}) {
	return {type:UPDATE_POST, id, title, body, author, category}
}

export function removeComment({id}) {
	return {type:REMOVE_POST, id}