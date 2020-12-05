import { FILTER_CHANGE, CLEAR_FILTERS } from "./filtersActions";

const DEFAULT_STATE = {
	dateStart: "",
	dateEnd: "",
	brideName: "",
	groomName: "",
};

export const filtersReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case FILTER_CHANGE:
			return {
				dateStart: action.filters.dateStart,
				dateEnd: action.filters.dateEnd,
				brideName: action.filters.brideName,
				groomName: action.filters.groomName,
			};
		case CLEAR_FILTERS:
			return DEFAULT_STATE;
		default:
			return state;
	}
};
