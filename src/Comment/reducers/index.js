import {ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT} from '../actions'
import { combineReducers } from 'redux'

const initialState = {}


function post(state = initialState, action) {
	const {id, body, author} = action
	switch(action.type) {
		case ADD_COMMENT :  
			return {...state, [id] : {body, author}}
		case UPDATE_COMMENT : 
			return  {...state, [id] : {body, author}}
		case REMOVE_COMMENT : 
			return {...state, [id] : null} 
		default :
			return state
	}
}