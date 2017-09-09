
import {RECIEVE_POSTS, ADD_POST, UPDATE_POST, REMOVE_POST} from '../actions'

const initialState = {}

export function post(state = initialState, action) {
	switch(action.type) {
		case RECIEVE_POSTS:
			return {...state, posts:action.posts}
		default:
			return state
	}
}