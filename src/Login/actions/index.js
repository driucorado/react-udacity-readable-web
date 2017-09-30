export const LOGIN_USER = "LOGIN_USER"
export const CHANGE_USER_NAME = "CHANGE_USER_NAME"

export function loginUser(userName) {
	return {type: LOGIN_USER, user: userName}
}

export function changeUserName(userName) {
	return {type:CHANGE_USER_NAME, user: userName}
}