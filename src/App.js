import React from "react";
import Firebase, { FirebaseContext } from "./components/Firebase/index";
import { composeStore } from "./reducers";
import { loggedIn, loggedOut } from "./actions/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as ROUTES from "./router/routes";
import { AppPage } from "./pages/AppPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SearchPage } from "./containers/SearchPage";
import { WeddingDetailPage } from "./containers/WeddingDetailPage";
import { Navbar } from "./containers/Navbar";
import { Provider } from "react-redux";
import { PrivateRoute } from "./router/PrivateRoute";
const firebase = new Firebase();
const store = composeStore();
export const App = (props) => {
	return (
		<Provider store={store}>
			<FirebaseContext.Provider value={firebase}>
				<BrowserRouter>
					<Navbar firebase={firebase} />
					<Switch>
						<Route path={ROUTES.LANDING} exact>
							<LandingPage firebase={firebase} />
						</Route>
						<Route path={ROUTES.SIGNIN} exact>
							<LoginPage firebase={firebase} />
						</Route>
						<PrivateRoute
							path={ROUTES.MY_EVENTS}
							component={AppPage}
							exact
						/>
						<Route path={ROUTES.SEARCH}>
							<SearchPage firebase={firebase} exact />
						</Route>
						<Route path={ROUTES.DETAIL}>
							<WeddingDetailPage firebase={firebase} exact />
						</Route>
					</Switch>
				</BrowserRouter>
			</FirebaseContext.Provider>
		</Provider>
	);
};

firebase.auth.onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(loggedIn(user));
	} else {
		store.dispatch(loggedOut());
	}
});
