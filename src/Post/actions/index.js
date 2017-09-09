import * as PostAPI from '../../api/PostAPI'

export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'

export function addPost({title, body, author, category}) {
	return {type:ADD_POST, title, body, author, category}
}

export function updatePost({title, body, author, category, id}) {
	return {type:UPDATE_POST, id, title, body, author, category}
}

export function removePost({id}) {
	return {type:REMOVE_POST, id}
}


export function recievePosts({category,posts}) {
	return {type:RECIEVE_POSTS, posts, category}
}

export const createPost = ({title, body, author, category}) => dispatch => (
	PostAPI
	.add({
		title,
		body,
		author,
		category
	})
	.then(data => dispatch(addPost(data))))


export const fetchPosts = (category) => dispatch => (
	PostAPI
	.getByCategory(category)
	.then(posts => dispatch(recievePosts({category,posts})))
)

