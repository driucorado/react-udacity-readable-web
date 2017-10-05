
import {UPDATE_POST, REMOVE_POST, RECIEVE_POST, RECIEVE_COMMENTS, PREPARE_ADD_POST, CHANGE_TITLE_POST, CHANGE_BODY_POST, BACK_TO_CATEGORY} from '../actions'
import {ADD_COMMENT, REMOVE_COMMENT, VOTE_COMMENT} from '../../Comment/actions'

const initialState = {showSaved: false, redirectToCategory:false, post: {}, comments: []}

export function post(state = initialState, action) {
	const {post} = action
	switch(action.type) {
		//RECIEVE POST
		case RECIEVE_POST:
			return {...state, post, showSaved: false, redirectToCategory:false}
		case PREPARE_ADD_POST:
			return {...state, redirectToCategory:false, post: {body: '', title: '', category:action.category}}
		case CHANGE_TITLE_POST:
			return {...state, post: {...state.post, title:action.title}}
		case CHANGE_BODY_POST:
			return {...state, post: {...state.post, body:action.body}}
		case UPDATE_POST: 
			return {...state, showSaved:true}
		case REMOVE_POST:
			return {...state}

		//COMMENTS
		case REMOVE_COMMENT:
			let comments = state.comments.filter((comment) =>  comment.id !== action.id)
			return {...state, comments: comments}
		case ADD_COMMENT:
			return {...state, comments: [...state.comments, action.comment]}
		case RECIEVE_COMMENTS: 
			//order comments by voteScore
			const orderComments = action.comments.sort((a,b) => {
				if (a.voteScore > b.voteScore) {
					return -1
				} else if (a.voteScore <= b.voteScore) {
					return 1
				}
				return 0
			})
			return {...state, comments: orderComments}
		
		case BACK_TO_CATEGORY:
			//back to category page
			return {...state, redirectToCategory:true}
		case VOTE_COMMENT:
			//Is there a better way????
			const newComments = state.comments.slice()
            const index = newComments.findIndex((element) => element.id === action.comment.id);
            newComments[index].voteScore = action.comment.voteScore
            const newOrderComments = newComments.sort((a,b) => {
                if (a.voteScore > b.voteScore) {
                    return -1
                } else if (a.voteScore <= b.voteScore) {
                    return 1
                }
                return 0
            })
            console.log(index)
			return {...state, comments: newOrderComments}
		default:
			return state
	}
}