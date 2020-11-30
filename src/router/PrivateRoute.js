import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.auth.user,
	};
};

const connection = connect(mapStateToProps, null);
const connectedComponent = connection(PrivateRoute);

export { connectedComponent as PrivateRoute };
