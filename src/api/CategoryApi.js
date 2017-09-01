
//endpoint readable api
const api = "http://localhost:5001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = 'gerardo_uNnYSnfvM1UoZhUzNXCe+BEzQwlHpPfgY8tPoGFyyZU='
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)