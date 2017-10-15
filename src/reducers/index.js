import {category} from '../Category/reducers'
import {post} from '../Post/reducers'
import {user} from '../Login/reducers'
import {comment} from '../Comment/reducers'
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

const initialState = {}

export function main(state = initialState, action) {
    //console.log(action)
    switch (action.type) {
        //navigation
        default:
            return state
    }
}


export default combineReducers({main, post, category, comment, user, routing: routerReducer})