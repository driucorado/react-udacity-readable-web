// import wikipedia from 'wikipedia-js'

import * as CategoryAPI  from '../../api/CategoryAPI'
import * as PostAPI from '../../api/PostAPI'

export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'
export const RECIEVE_WIKI_INFO = 'RECIEVE_WIKI_INFO'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const recieveCategories = categories => ({
  type: RECIEVE_CATEGORIES,
  categories
});

export const removePost = (postId) => {
	return {type:REMOVE_POST, postId:postId}
}

export const votePost = (post, option) => {
	return {type:VOTE_POST, post, option:option}
}



export const fetchCategories = () => dispatch => (
  CategoryAPI
      .getAll()
      .then(categories => dispatch(recieveCategories(categories)))
)

export function recievePosts({category,posts}) {
	return {type:RECIEVE_POSTS, posts, category}
}

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
	PostAPI.
	deletePost(postId)
	.then(data => dispatch(removePost(postId)))
)