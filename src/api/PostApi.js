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

export const getCommentsByPost = (id) => 
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)


export const getById = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const deletePost = (id) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
}

export const  updatePostDetails = ({id, title, body}) => {
  const postUpdate = Object.assign({
  	title: null,
  	body: null
  }, {title: title, body: body})
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postUpdate)
  }).then(res => res.json())
    .then(data => data)
}

export const  ratingPost = (id, option) => {
  const ratingPostObject = Object.assign({
  	option: null
  }, {option: option})
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ratingPostObject)
  }).then(res => res.json())
    .then(data => data)
}

export const getByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const add = (post) => {
  const newPost = Object.assign({
  	id:uuid(),
  	timestamp:Date.now(),
  	title:null,
  	body:null,
  	author:null,
  	category:null
  }, post)
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  }).then(res => res.json())
    .then(data => data)
}


