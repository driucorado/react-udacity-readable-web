import {RECEIVE_POSTS, RECIEVE_POST, PREPARE_ADD_POST} from '../../Post/actions'
import {RECIEVE_CATEGORIES} from '../../Category/actions'

const initialState = {selectedCategory: null, categories: {}, categoryList: []}

/**
 * Category Reducer contains all the information for category data
 * @param state
 * @param action
 * @returns {*}
 */
export function category(state =  initialState, action) {
	switch(action.type) {
        case RECIEVE_CATEGORIES :
            const newCategories = action.categories.reduce((carry, item) => {
                carry[item.path] = item
                return carry
            }, {});
            const catOrdered = action.categories.map((item) => (
                item.path
            ));
            return {...state, categories: newCategories, categoryList: catOrdered}
        case PREPARE_ADD_POST:
        case RECIEVE_POST:
        case RECEIVE_POSTS:
            return {...state, selectedCategory: action.category}
		default:
			return state
	}	
}