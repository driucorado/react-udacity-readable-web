import config from '../default.json'

//endpoint readable api
const api = config.api.endpoint
let token = config.api.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)
// Generate a unique token for storing your bookshelf data on the backend server.


const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAll = () =>
    fetch(`${api}/categories`, {headers})
        .then(res => res.json())
        .then(data => data.categories)