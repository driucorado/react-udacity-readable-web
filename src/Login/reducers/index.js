import {REGISTER_USER} from '../actions'

const initialState = {user : null}

export function user(state = initialState, action) {
	//console.log(action)
	switch(action.type) {
		case REGISTER_USER :  
			return {...state, user: action.user}
		default:
			return state
	}
}
