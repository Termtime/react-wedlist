import { connect } from "react-redux";
import { WeddingDetailPage } from "../pages/WeddingDetailPage";

const mapStateToProps = (state) => {
	return {
		uid: state.auth.uid,
	};
};

const connection = connect(mapStateToProps, null);

const connectedComponent = connection(WeddingDetailPage);

export { connectedComponent as WeddingDetailPage };
