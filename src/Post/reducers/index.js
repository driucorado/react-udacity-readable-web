
import {REMOVE_POST, ADD_POST, RECEIVE_POSTS, PREPARE_ADD_POST, RECIEVE_POST, CHANGE_POST_DATA, VOTE_POST, ORDER_POSTS_BY_VOTE, ORDER_POSTS_BY_TIME, OPEN_POST_EDITION, EMPTY_CURRENT_POST} from '../actions'
import {RECEIVE_COMMENTS, REMOVE_COMMENT} from "../../Comment/actions/index";


const initialState = {currentPost: null, posts: {}, list: [], newPost: {body: '', title: ''}, openPostEdition: false}

/**
 * Post Reducer , contains all the information for one post
 * @param state
 * @param action
 * @returns {*}
 */
export function post(state = initialState, action) {
	const {post} = action
	switch(action.type) {
	    //Comment
        case REMOVE_COMMENT:
            return {...state}
        case EMPTY_CURRENT_POST:
            return {...state, currentPost: null}
        case ADD_POST:
            return {...state, posts: {...state.posts, [action.post.id] : action.post}, list:[...state.list,action.post.id]}
		//post
        case OPEN_POST_EDITION:
            if (action.postId) {
                return {
                    ...state, openPostEdition: !state.openPostEdition,
                    currentPost: action.postId,
                    posts: {...state.posts, [action.postId]: {...state.posts[action.postId]}}
                }
            } else {
                return {...state, currentPost: null, openPostEdition: !state.openPostEdition, newPost: {body: '', title: ''}}
            }
        case CHANGE_POST_DATA:
            if (action.postId) {
                return {...state, posts: {...state.posts, [action.postId]: {...state.posts[action.postId], ...action.data}}}
            } else {
                return {...state, newPost: {...state.newPost, ...action.data}}
            }
            return state
        case RECIEVE_POST:
			return {...state, currentPost: post.id, posts: {...state.posts, [action.post.id] : action.post}}
        case PREPARE_ADD_POST:
            return {...state, currentPost: action.post.id, posts: {...state.posts, [action.post.id]: action.post}}
        case RECEIVE_COMMENTS: //one post
            return {...state, posts: {...state.posts, [action.postId]: {...state.posts[action.postId], commentCount: action.comments.length}}}

		//POSTS
        case RECEIVE_POSTS:
            const newPostsReceived = action.posts.reduce((carry, item) => {
                carry[item.id] = item
                return carry
            }, {});
            const postOrdered = action.posts.map((item) => (
                item.id
            ));
            return {...state, posts: newPostsReceived, list: postOrdered, title: action.category}
        // VOTE_POST change the vote
        case VOTE_POST:
            return {...state, posts: {...state.posts, [action.post.id] : {...state.posts[action.post.id], voteScore: action.post.voteScore}}}
        // REMOVE_POST remove the post from the list
        case REMOVE_POST:
        	const newPostList = state.list.filter((post) => post !== action.postId)
            return {...state, list: newPostList}
        case ORDER_POSTS_BY_VOTE:
            const newPostsVote = state.list.slice()
			const newOrderPostsByVote = newPostsVote.map((post) => (state.posts[post])).sort((a,b) => {
                if (a.voteScore < b.voteScore) return 1;
                if (a.voteScore >= b.voteScore) return -1;
                return 0
            }).map((post) => (post.id))
            return {...state, list: newOrderPostsByVote}
        case ORDER_POSTS_BY_TIME:
            const newPostsTime = state.list.slice()
            const newOrderPostsByTime = newPostsTime.map((post) => (state.posts[post])).sort((a,b) => {
                if (a.timestamp > b.timestamp) return 1;
                if (a.timestamp <= b.timestamp) return -1;
                return 0
            }).map((post) => (post.id))
            return {...state, list: newOrderPostsByTime}
		default:
			return state
	}
}