import React from "react";
import * as ROUTES from "./routes";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={ROUTES.SIGNIN} />
				)
			}
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
