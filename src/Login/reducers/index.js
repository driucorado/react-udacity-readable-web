import {CHANGE_USER_NAME, LOGIN_USER} from '../actions'

const initialState = {user: '', newUser: ''}

/**
 * User reducer, the information of one user
 * @param state
 * @param action
 * @returns {*}
 */
export function user(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USER_NAME:
            return {...state, newUser: action.user}
        case LOGIN_USER:
            return {...state, user: action.user}
        default:
            return state
    }
}
