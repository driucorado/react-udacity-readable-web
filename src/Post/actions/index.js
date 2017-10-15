import {
    ADD_POST,
    BACK_TO_CATEGORY,
    CHANGE_POST_DATA,
    EMPTY_CURRENT_POST,
    OPEN_POST_EDITION,
    ORDER_POSTS_BY_TIME,
    ORDER_POSTS_BY_VOTE,
    RECEIVE_POST,
    RECEIVE_POSTS,
    REMOVE_POST,
    SAVE_POST,
    UPDATE_POST,
    VOTE_POST
} from '../types'
import * as PostAPI from '../../api/PostApi'

export function emptyCurrentPost() {
    return {type: EMPTY_CURRENT_POST}
}

export function savePost(postId) {
    return {type: SAVE_POST, postId: postId}
}

export function togglePostEdition(postId) {
    return {type: OPEN_POST_EDITION, postId: postId}
}

export function orderPostsByVote(option) {
    return {type: ORDER_POSTS_BY_VOTE}
}

export function orderPostsByTime(option) {
    return {type: ORDER_POSTS_BY_TIME}
}

export function registerChangeData(postId, data) {
    return {type: CHANGE_POST_DATA, data: data, postId: postId}

}

export function recievePosts({category, posts}) {
    return {type: RECEIVE_POSTS, posts, category}
}

export function backToCategory(category) {
    return {type: BACK_TO_CATEGORY, category: category}

}

export function addPost(post) {
    return {type: ADD_POST, post}
}

export function updatePost(post) {
    return {type: UPDATE_POST, ...post}
}

export const removePost = (postId) => {
    return {type: REMOVE_POST, postId: postId}
}

export function receivePost(data) {
    return {type: RECEIVE_POST, post: data, category: data.category}
}

export const votePost = (post, option) => {
    return {type: VOTE_POST, post, option: option}
}


//API methods
export const getPost = (id) => dispatch => (
    PostAPI
        .getById(id)
        .then((data) => dispatch(receivePost(data))))

export const editPost = (post) => dispatch => (
    PostAPI
        .updatePostDetails(post)
        .then(data => dispatch(updatePost(data)))
)

export const createPost = ({title, body, author, category}) => dispatch => (
    PostAPI
        .add({
            title,
            body,
            author,
            category
        })
        .then(data => dispatch(addPost(data)))
)


export const getAllPosts = () => dispatch => (
    PostAPI
        .getAll()
        .then((posts) => dispatch(recievePosts({category: undefined, posts: posts})))
        .then(posts => dispatch(orderPostsByVote()))
)

export const fetchPosts = (category) => dispatch => (
    PostAPI
        .getByCategory(category)
        .then(posts => dispatch(recievePosts({category, posts})))
        .then(posts => dispatch(orderPostsByVote()))
)

export const ratingPost = (post, option) => dispatch => (
    PostAPI
        .ratingPost(post.id, option)
        .then(data => dispatch(votePost(post, option)))
)


export const deletePost = (postId) => dispatch => (
    PostAPI
        .deletePost(postId)
        .then(data => dispatch(removePost(postId)))
)