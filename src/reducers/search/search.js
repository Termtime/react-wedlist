import { CLEAR_SEARCH, SEARCH } from "./searchActions";

const INITIAL_STATE = {
	searchQuery: "",
	results: [],
};

export const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SEARCH:
			return {
				searchQuery: action.payload.query,
				results: action.payload.results,
			};
		case CLEAR_SEARCH:
			return INITIAL_STATE;
		default:
			return state;
	}
};
