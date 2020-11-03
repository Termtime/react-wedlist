import React from "react";

import { FirebaseContext } from "./index";

const withFirebase = (Component) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component firebase={firebase}></Component>}
  </FirebaseContext.Consumer>
);

export { withFirebase };
