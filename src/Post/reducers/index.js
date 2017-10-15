import {
    ADD_POST,
    BACK_TO_CATEGORY,
    CHANGE_POST_DATA,
    EMPTY_CURRENT_POST,
    OPEN_POST_EDITION,
    CLOSE_POST_EDITION,
    ORDER_POSTS_BY_TIME,
    ORDER_POSTS_BY_VOTE,
    PREPARE_ADD_POST,
    RECEIVE_POST,
    RECEIVE_POSTS,
    REMOVE_POST,
    VOTE_POST
} from '../types'
import {ADD_COMMENT, RECEIVE_COMMENTS, REMOVE_COMMENT} from "../../Comment/types";

const initialStateNewPost = {body: '', title: '', category: 'react', author: ''}

const initialState = {
    currentPost: null,
    posts: {},
    list: [],
    newPost: {...initialStateNewPost},
    openPostEdition: false,
    backToCategory: null
}

/**
 * Post Reducer , contains all the information for one post
 * @param state
 * @param action
 * @returns {*}
 */
export function post(state = initialState, action) {
    const {post} = action
    switch (action.type) {
        //Back to category
        case BACK_TO_CATEGORY:
            return {...state, backToCategory: action.category, currentPost: null}
        //Comment
        case REMOVE_COMMENT:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.postId]: {
                        ...state.posts[action.postId],
                        commentCount: (state.posts[action.postId].commentCount - 1)
                    }
                }
            }
        case EMPTY_CURRENT_POST:
            return {...state, currentPost: null}
        case ADD_POST:
            return {
                ...state,
                posts: {...state.posts, [action.post.id]: action.post},
                list: [...state.list, action.post.id]
            }
        //pot
        case CLOSE_POST_EDITION:
            return {...state, openPostEdition: false}
        case OPEN_POST_EDITION:
            if (action.postId) {
                return {
                    ...state, openPostEdition: true,
                    currentPost: action.postId,
                    posts: {...state.posts, [action.postId]: {...state.posts[action.postId]}}
                }
            } else {
                return {
                    ...state,
                    currentPost: null,
                    openPostEdition: true,
                    newPost: {...initialStateNewPost}
                }
            }
        case CHANGE_POST_DATA:
            if (action.postId) {
                return {
                    ...state,
                    posts: {...state.posts, [action.postId]: {...state.posts[action.postId], ...action.data}}
                }
            } else {
                return {...state, newPost: {...state.newPost, ...action.data}}
            }
        case RECEIVE_POST:
            return {
                ...state,
                backToCategory: null,
                currentPost: post.id,
                posts: {...state.posts, [action.post.id]: action.post}
            }
        case PREPARE_ADD_POST:
            return {...state, currentPost: action.post.id, posts: {...state.posts, [action.post.id]: action.post}}
        case RECEIVE_COMMENTS: //one post
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.postId]: {...state.posts[action.postId], commentCount: action.comments.length}
                }
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.comment.parentId]: {
                        ...state.posts[action.comment.parentId],
                        commentCount: (state.posts[action.comment.parentId].commentCount + 1)
                    }
                }
            }
        //RECEIVE ALL POSTS
        case RECEIVE_POSTS:
            const newPostsReceived = action.posts.reduce((carry, item) => {
                carry[item.id] = {...item, commentCount: -1}
                return carry
            }, {});
            const postOrdered = action.posts.map((item) => (
                item.id
            ));
            return {...state, posts: newPostsReceived, list: postOrdered, title: action.category}

        case VOTE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.id]: {...state.posts[action.post.id], voteScore: action.post.voteScore}
                }
            }
        // REMOVE_POST remove the post from the list
        case REMOVE_POST:
            const newPostList = state.list.filter((post) => post !== action.postId)
            const isTheCurrentPost = state.currentPost === action.postId
            return {...state, list: newPostList, currentPost: (isTheCurrentPost) ? null : state.currentPost}
        case ORDER_POSTS_BY_VOTE:
            const newPostsVote = state.list.slice()
            const newOrderPostsByVote = newPostsVote.map((post) => (state.posts[post])).sort((a, b) => {
                if (a.voteScore < b.voteScore) return 1;
                if (a.voteScore >= b.voteScore) return -1;
                return 0
            }).map((post) => (post.id))
            return {...state, list: newOrderPostsByVote}
        case ORDER_POSTS_BY_TIME:
            const newPostsTime = state.list.slice()
            const newOrderPostsByTime = newPostsTime.map((post) => (state.posts[post])).sort((a, b) => {
                if (a.timestamp > b.timestamp) return 1;
                if (a.timestamp <= b.timestamp) return -1;
                return 0
            }).map((post) => (post.id))
            return {...state, list: newOrderPostsByTime}
        default:
            return state
    }
}