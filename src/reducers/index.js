import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth/auth";
import { filtersReducer } from "./filters/filters";
import { searchReducer } from "./search/search";
import { composeWithDevTools } from "redux-devtools-extension";

export const composeStore = () => {
	const rootReducer = combineReducers({
		auth: authReducer,
		filters: filtersReducer,
		search: searchReducer,
	});
	const store = createStore(rootReducer, composeWithDevTools());

	return store;
};
