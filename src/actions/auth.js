import { LOGIN, LOGOUT } from "../reducers/auth/authActions";

export const loggedIn = (user) => ({
	type: LOGIN,
	user,
});

export const loggedOut = () => ({
	type: LOGOUT,
});
