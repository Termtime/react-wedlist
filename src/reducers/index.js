import { SEARCH } from "./actions";

const INITIAL_STATE = {
	searchQuery: "",
	results: [],
};

const search = (state = INITIAL_STATE, action) => {
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

export { search };
