import uuid from 'uuid/v4';
import config from '../default.json' 
//endpoint readable api
const api = config.api.endpoint
let token = config.api.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCommentsByPost = (id) => {
  return fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)
  }

export const getById = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

/* 
 * 
 * @var postId id  
 * @var option
 */
export const ratingComment = (postId, option) => {
  const ratingPostObject = Object.assign({
    option: null
  }, {option: option})
  return fetch(`${api}/comments/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ratingPostObject)
  }).then(res => res.json())
    .then(data => data)
}

/*
 * delete post
 * @var id delete post 
 */
export const deleteComment = (id) => {
  const postUpdate = {}
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postUpdate)
  }).then(res => res.json())
    .then(data => data)
}

export const update = (comment) => {
  const newComment = Object.assign({
    body:null
  }, comment)
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  }).then(res => res.json())
    .then(data => data)
}

/* @var comment create new comment */
export const add = (comment) => {
  const newComment = Object.assign({
  	id:uuid(),
  	timestamp:Date.now(),
  	body:null,
  	author:null,
  	parentId:null
  }, comment)
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  }).then(res => res.json())
    .then(data => data)
}

