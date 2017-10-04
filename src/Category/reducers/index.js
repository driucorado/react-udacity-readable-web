import {RECIEVE_POSTS, VOTE_POST, REMOVE_POST} from '../actions'

const initialState = {posts : []}

export function category(state =  initialState, action) {
	switch(action.type) {
		case RECIEVE_POSTS: 
			return {...state, posts: action.posts, title: action.category}
		case VOTE_POST:
			state.posts[state.posts.findIndex(el => el.id === action.post.id)] = action.post;
			const newOrderPosts = state.posts.sort((a,b) => (
				b.voteScore - a.voteScore
			))
			return {...state, posts: newOrderPosts}
		case REMOVE_POST:
			let posts = state.posts.filter((post) =>  post.id !== action.postId)
			return {...state, posts: posts}
		default:
			return state
	}	
}