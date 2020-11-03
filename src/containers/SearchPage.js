import { connect } from "react-redux";
import { SearchPageBase } from "../pages/SearchPage";

const mapStateToProps = (state) => {
	return {
		query: state.searchQuery,
		results: state.results,
	};
};

const connection = connect(mapStateToProps, null);

const connectedComponent = connection(SearchPageBase);

export { connectedComponent as SearchPage };
