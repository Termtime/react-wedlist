import { connect } from "react-redux";
import { SEARCH } from "../reducers/actions";
import { NavbarBase } from "../components/Navbar";
const mapStateToProps = (state) => {
	return {};
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
