import {
    ADD_COMMENT,
    CHANGE_COMMENT_DATA,
    RECEIVE_COMMENTS,
    REMOVE_COMMENT,
    SET_CURRENT_COMMENT,
    UPDATE_COMMENT,
    VOTE_COMMENT
} from '../actions'

const initialState = {comments: {}, list: [], newComment: {body: ''}, currentComment: null, openCommentEdition: false}

/**
 * Comment reducer contains all the information for one comment, only one
 * @param state
 * @param action
 * @returns {*}
 */
export function comment(state = initialState, action) {
    switch (action.type) {
        case CHANGE_COMMENT_DATA:
            if (action.commentId) {
                return {
                    ...state,
                    comments: {
                        ...state.comments,
                        [action.commentId]: {...state.comments[action.commentId], ...action.data}
                    }
                }
            } else {
                return {...state, newComment: {...state.newComment, ...action.data}}
            }
        case SET_CURRENT_COMMENT:
            return {...state, currentComment: action.commentId, openCommentEdition: true}
        case REMOVE_COMMENT:
            let listRemove = state.list.filter((comment) => comment !== action.id)
            return {...state, comments: {...state.comments, [action.id]: null}, list: listRemove}
        case ADD_COMMENT:
            return {
                ...state,
                comments: {...state.comments, [action.comment.id]: action.comment},
                list: [...state.list, action.comment.id]
            }
        case RECEIVE_COMMENTS:
            const newCommentReceived = action.comments.reduce((carry, item) => {
                carry[item.id] = item
                return carry
            }, {});
            const commentOrdered = action.comments.map((item) => (item.id));
            return {...state, comments: newCommentReceived, list: commentOrdered}
        case UPDATE_COMMENT:
            return {...state, comments: {...state.comments, [action.comment.id]: action.comment}}
        case VOTE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.id]: {...state.comments[action.comment.id], voteScore: action.comment.voteScore}
                }
            }
        default :
            return state
    }
}