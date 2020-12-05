import React from "react";

import { FirebaseContext } from "./index";

const withFirebase = (Component) => (props) => (
	<FirebaseContext.Consumer>
		{(firebase) => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
);

export { withFirebase };
