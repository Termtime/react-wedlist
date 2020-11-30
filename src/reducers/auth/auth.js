import { LOGIN, LOGOUT } from "./authActions";

const INITIAL_STATE = {
	user: null,
	uid: null,
};
export const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				user: action.user,
				uid: action.user.uid,
			};
		case LOGOUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};
