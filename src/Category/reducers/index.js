import {RECIEVE_POSTS} from '../actions'

const initialState = {posts : []}

export function category(state =  initialState, action) {
	switch(action.type) {
		case RECIEVE_POSTS: 
			return {...state, posts: action.posts, title: action.category}
		default:
			return state
	}	
}