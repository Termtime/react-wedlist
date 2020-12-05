import { connect } from "react-redux";
import { FilterMenuBase } from "../components/FilterOptions";
import { withFirebase } from "../components/Firebase/consumer";
import {
	CLEAR_FILTERS,
	FILTER_CHANGE,
} from "../reducers/filters/filtersActions";
import { SEARCH } from "../reducers/search/searchActions";

const mapStateToProps = (state) => {
	return {
		filters: {
			dateStart: state.filters.dateStart,
			dateEnd: state.filters.dateEnd,
			brideName: state.filters.brideName,
			groomName: state.filters.groomName,
		},
		query: state.search.searchQuery,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setFilters: (filters) => dispatch({ type: FILTER_CHANGE, filters }),
		emitSearch: (query, results) =>
			dispatch({
				type: SEARCH,
				payload: { query: query, results: results },
			}),
		clearFilters: () => dispatch({ type: CLEAR_FILTERS }),
	};
};

const connection = connect(mapStateToProps, mapDispatchToProps)(FilterMenuBase);

const connectedComponent = withFirebase(connection);

export { connectedComponent as FilterOptions };
