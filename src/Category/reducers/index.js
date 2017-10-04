import {VOTE_POST, REMOVE_POST, ORDER_POSTS_BY_TIME, ORDER_POSTS_BY_VOTE} from '../../Post/actions'
import {RECIEVE_POSTS} from '../../Post/actions'

const initialState = {posts : []}

export function category(state =  initialState, action) {
	switch(action.type) {
		case RECIEVE_POSTS: 
			return {...state, posts: action.posts, title: action.category}
		case VOTE_POST:
			state.posts[state.posts.findIndex(el => el.id === action.post.id)] = action.post;
			return {...state}
		case REMOVE_POST:
			let posts = state.posts.filter((post) =>  post.id !== action.postId)
			return {...state, posts: posts}
		case ORDER_POSTS_BY_VOTE:
            const newOrderPostsByTime = state.posts.sort((a,b) => {
            	if (a.voteScore > b.voteScore) return 1;
                if (a.voteScore <= b.voteScore) return -1;
                return 0
            })
			return {...state, posts: newOrderPostsByTime}
		default:
			return state
	}	
}