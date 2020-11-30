import { SEARCH } from "./searchActions";

const INITIAL_STATE = {
	searchQuery: "",
	results: [],
};

export const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SEARCH:
			return {
				...state,
				searchQuery: action.payload.query,
				results: action.payload.results,
			};
		default:
			return state;
	}
};
