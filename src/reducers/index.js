import {category} from '../Category/reducers'
import {post} from '../Post/reducers'
import { combineReducers } from 'redux'
import {RECIEVE_CATEGORIES} from '../Category/actions'

const initialState = {categories : []}

export function main(state = initialState, action) {
	//console.log(action)
	switch(action.type) {
		case RECIEVE_CATEGORIES :  
			return {...state, categories: action.categories}
		default:
			return state
	}
}


export default combineReducers({main, category, post})