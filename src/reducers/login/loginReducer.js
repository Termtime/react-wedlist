import { LOGIN, LOGOUT } from "./actions";

const DEFAULT_LOGIN_STATE = {
	user: null,
};
const loginReducer = (state = DEFAULT_LOGIN_STATE, action) => {
	switch (action.type) {
		case LOGIN:
			return state;
		case LOGOUT:
			return state;
		default:
			return state;
	}
};
