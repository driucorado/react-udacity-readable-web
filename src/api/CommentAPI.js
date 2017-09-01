import uuid from 'uuid/v4';
//endpoint readable api
const endpoint = "localhost:5001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = 'gerardo_uNnYSnfvM1UoZhUzNXCe+BEzQwlHpPfgY8tPoGFyyZU='
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCommentsByPost = (id) => 
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getById = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data.book)
    
/* 
 * 
 * @var postId id  
 * @var option
 */
export const ratingComment = (postId, option) =>
  const ratingPostObject = Object.assign({
    option: null
  }, {option: option})
  fetch(`${api}/comments/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ratingPostObject)
  }).then(res => res.json())
    .then(data => data.books)

/*
 * delete post
 * @var id delete post 
 */
export const deletePost = (id) =>
  const postUpdate = {}
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postUpdate)
  }).then(res => res.json())
    .then(data => data.books)

/* @var comment create new comment */
export const add = (comment) =>
  const newPost = Object.assign({
  	id:uuid(),
  	timestamp:Date.now(),
  	body:null,
  	author:null,
  	parentId:null
  }, post)
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  }).then(res => res.json())
    .then(data => data.books)


