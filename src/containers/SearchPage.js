import { connect } from "react-redux";
import { SearchPageBase } from "../pages/SearchPage";
import { CLEAR_SEARCH } from "../reducers/search/searchActions";

const mapStateToProps = (state) => {
	return {
		query: state.search.searchQuery,
		results: state.search.results,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearResults: () => dispatch({ type: CLEAR_SEARCH }),
	};
};
const connection = connect(mapStateToProps, mapDispatchToProps);

const connectedComponent = connection(SearchPageBase);

export { connectedComponent as SearchPage };
