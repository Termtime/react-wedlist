import { connect } from "react-redux";
import { SearchPageBase } from "../pages/SearchPage";

const mapStateToProps = (state) => {
	return {
		query: state.search.searchQuery,
		results: state.search.results,
	};
};

const connection = connect(mapStateToProps, null);

const connectedComponent = connection(SearchPageBase);

export { connectedComponent as SearchPage };
