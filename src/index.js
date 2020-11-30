import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap";
import "./index.css";
import { AppPage } from "./pages/AppPage";
import reportWebVitals from "./reportWebVitals";
import Firebase, { FirebaseContext } from "./components/Firebase/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as ROUTES from "./router/routes";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SearchPage } from "./containers/SearchPage";
import { Navbar } from "./containers/Navbar";
import { Provider } from "react-redux";
import { WeddingDetailPage } from "./pages/WeddingDetailPage";
import { composeStore } from "./reducers";
import { loggedIn, loggedOut } from "./actions/auth";
import { PrivateRoute } from "./router/PrivateRoute";

const firebase = new Firebase();
const store = composeStore();
ReactDOM.render(
	<React.StrictMode>
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
	</React.StrictMode>,
	document.getElementById("root")
);

firebase.auth.onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(loggedIn(user));
	} else {
		store.dispatch(loggedOut());
	}
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
