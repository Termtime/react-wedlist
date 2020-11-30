import { FILTER_CHANGE, CLEAR_FILTERS } from "./filtersActions";

const DEFAULT_STATE = {
	dateStart: null,
	dateEnd: null,
	brideName: null,
	groomName: null,
};

export const filtersReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case FILTER_CHANGE:
			return {
				dateStart: action.payload.filters.dateStart,
				dateEnd: action.payload.filters.dateEnd,
				brideName: action.payload.filters.brideName,
				groomName: action.payload.filters.groomName,
			};
		case CLEAR_FILTERS:
			return DEFAULT_STATE;
		default:
			return state;
	}
};
