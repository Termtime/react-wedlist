import { connect } from "react-redux";
import { SEARCH } from "../reducers/search/searchActions";
import { NavbarBase } from "../components/Navbar";
const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		uid: state.auth.uid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		emitSearch: (query, results) =>
			dispatch({
				type: SEARCH,
				payload: { query: query, results: results },
			}),
	};
};

const connection = connect(mapStateToProps, mapDispatchToProps);

const connectedComponent = connection(NavbarBase);

export { connectedComponent as Navbar };
