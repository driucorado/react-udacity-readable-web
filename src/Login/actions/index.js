export const REGISTER_USER = "REGISTER_USER"

export function registerUser(userName) {
	return {type:REGISTER_USER, user: {userName}}
}