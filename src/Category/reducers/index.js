import {VOTE_POST, REMOVE_POST, ORDER_POSTS_BY_TIME, ORDER_POSTS_BY_VOTE} from '../../Post/actions'
import {RECIEVE_POSTS} from '../../Post/actions'

const initialState = {posts : [], orderBy:'vote'}

export function category(state =  initialState, action) {
	switch(action.type) {
		case RECIEVE_POSTS:
			return {...state, posts: action.posts, title: action.category}
		case VOTE_POST:
            const newPosts = state.posts.slice()
            const index = newPosts.findIndex((element) => element.id === action.post.id);
            newPosts[index].voteScore = action.post.voteScore
            // const newOrderPostsByScore = newPosts.sort((a,b) => {
            //     if (a.voteScore < b.voteScore) return 1;
            //     if (a.voteScore >= b.voteScore) return -1;
            //     return 0
            // })
			return {...state, posts:newPosts}
		case REMOVE_POST:
			let posts = state.posts.filter((post) =>  post.id !== action.postId)
			return {...state, posts: posts}
		case ORDER_POSTS_BY_VOTE:
            const newPostsVote = state.posts.slice()
            const newOrderPostsByVote = newPostsVote.sort((a,b) => {
            	if (a.voteScore < b.voteScore) return 1;
                if (a.voteScore >= b.voteScore) return -1;
                return 0
            })
			return {...state, posts: newOrderPostsByVote}
		case ORDER_POSTS_BY_TIME:
            const newPostsTime = state.posts.slice()
            const newOrderPostsByTime = newPostsTime.sort((a,b) => {
                if (a.timestamp > b.timestamp) return 1;
                if (a.timestamp <= b.timestamp) return -1;
                return 0
            })
            return {...state, posts: newOrderPostsByTime}
		default:
			return state
	}	
}