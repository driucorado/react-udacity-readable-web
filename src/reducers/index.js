import {category} from '../Category/reducers'
import {post} from '../Post/reducers'
import {user} from '../Login/reducers'
import {comment} from '../Comment/reducers'
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {BACK_TO_CATEGORY} from '../Post/actions'

const initialState = {showSaved: false, redirectToCategory: false}

export function main(state = initialState, action) {
    //console.log(action)
    switch (action.type) {
        //navigation
        case BACK_TO_CATEGORY:
            //back to category page
            return {...state, redirectToCategory: true}
        default:
            return state
    }
}


export default combineReducers({main, post, category, comment, user, routing: routerReducer})