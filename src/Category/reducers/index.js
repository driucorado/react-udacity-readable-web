import {RECIEVE_WIKI_INFO} from '../actions'

const initialState = {posts : []}

export function category(state =  initialState, action) {
	switch(action.type) {
		case RECIEVE_WIKI_INFO:
			return {...state, wikiData: action.dataWiki}
		default:
			return state
	}	
}