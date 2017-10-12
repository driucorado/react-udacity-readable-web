import * as PostAPI from '../../api/PostApi'

//changes
export const CHANGE_BODY_POST = "CHANGE_BODY_POST"
export const CHANGE_TITLE_POST = "CHANGE_TITLE_POST"
export const CHANGE_POST_DATA = "CHANGE_DATA"

export const ADD_POST = 'ADD_POST'
export const OPEN_POST_EDITION = 'OPEN_POST_EDITION'

export const UPDATE_POST = 'UPDATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const GET_POST = 'GET_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'

export const RECIEVE_POST = 'RECIEVE_POST'
export const BACK_TO_CATEGORY = 'BACK_TO_CATEGORY'

export const ORDER_POSTS_BY_VOTE = 'ORDER_POSTS_BY_VOTE'
export const ORDER_POSTS_BY_TIME = 'ORDER_POSTS_BY_TIME'

export const PREPARE_ADD_POST = 'PREPARE_ADD_POST'

export const SAVE_POST = 'SAVE_POST'
export const EMPTY_CURRENT_POST = 'EMPTY_CURRENT_POST'

export function emptyCurrentPost() {
	return {type:EMPTY_CURRENT_POST}
}

export function savePost(postId) {
	return {type: SAVE_POST, postId:postId}
}

export function togglePostEdition(postId) {
	return {type:OPEN_POST_EDITION, postId:postId}
}

export function orderPostsByVote(option) {
	return {type: ORDER_POSTS_BY_VOTE}
}

export function orderPostsByTime(option) {
    return {type: ORDER_POSTS_BY_TIME}
}

export function registerChangeData(postId, data) {
	return {type:CHANGE_POST_DATA, data:data, postId:postId}

}

export function recievePosts({category,posts}) {
    return {type:RECEIVE_POSTS, posts, category}
}

export function backToCategory(category) {
	return {type: BACK_TO_CATEGORY, category: category}

}

export function changeBody(body, postId) {
	return {type:CHANGE_BODY_POST,  body:body, postId:postId}
}

export function changeTitle(title, postId) {
	return {type:CHANGE_TITLE_POST,  title:title, postId:postId}
}

export function prepareAddPost(cat) {
	return {type:PREPARE_ADD_POST, category:cat, post: {body: '', title: '', category:cat, id: 'new'}}
}

export function addPost(post) {
	return {type:ADD_POST, post}
}

export function updatePost({title, body, author, category, id}) {
	return {type:UPDATE_POST, id, title, body, author, category}
}

export const removePost = (postId) => {
    return {type:REMOVE_POST, postId:postId}
}

export function receivePost(data) {
	return {type:RECIEVE_POST, post:data, category: data.category}
}

export const votePost = (post, option) => {
    return {type:VOTE_POST, post, option:option}
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
	.then((posts) => dispatch(recievePosts({category:undefined,posts:posts})))
)

export const fetchPosts = (category) => dispatch => (
    PostAPI
    .getByCategory(category)
    .then(posts => dispatch(recievePosts({category,posts})))
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