import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as ROUTES from "../router/routes";
import "../styles/navbar.css";
import { data } from "jquery";
const NavbarBase = (props) => {
	const history = useHistory();
	const location = useLocation();
	const [searchQuery, setSearchQuery] = useState("");

	//TODO:Eliminar esto despues de pasarlo a redux
	// useEffect(() => {
	// 	props.firebase.auth.onAuthStateChanged((user) => {
	// 		if (user) {
	// 			setIsLoggedIn(true);
	// 		} else {
	// 			setIsLoggedIn(false);
	// 		}
	// 		setIsAuthReady(true);
	// 	});
	// }, []);

	function signInWithGoogle() {
		history.push(ROUTES.SIGNIN);
	}

	async function signout() {
		console.log("logging out");
		if (await props.firebase.logout()) {
			console.log("logogut success");
			history.push(ROUTES.LANDING);
		}
	}

	async function search(e) {
		if (e) e.preventDefault();
		var query = searchQuery;
		var results = [];
		props.firebase.db
			.collection("weddings")
			.orderBy("nameLowerCase")
			.startAt(searchQuery.toLowerCase())
			.endAt(searchQuery.toLowerCase() + "\uf8ff")
			.limit(25)
			.get()
			.then((snapshot) => {
				console.log("then");
				console.log(snapshot);
				snapshot.forEach((doc) => {
					console.log(doc.data());
					results.push({ id: doc.id, data: doc.data() });
				});
				props.emitSearch(query, results);
				history.push(ROUTES.SEARCH);
			})
			.catch((error) => console.log(error));
	}

	function goToMyEvents() {
		history.push(ROUTES.MY_EVENTS);
	}
	return (
		<div className="navbar-container">
			<nav
				id="navbar-main"
				className="navbar fixed-top navbar-expand-lg navbar-dark "
			>
				<Link to="/" className="navbar-brand">
					WedList
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbar"
					aria-controls="navbar"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbar">
					<ul className="navbar-nav ml-auto mr-auto">
						<li className="nav-item">
							<form
								className="form-inline center-self my-2 my-lg-0"
								onSubmit={search}
							>
								<div className="input-group">
									<input
										className="form-control mr-sm-2"
										type="search"
										placeholder="Search"
										aria-label="Search"
										value={searchQuery}
										onInput={(e) =>
											setSearchQuery(e.target.value)
										}
									/>
									<button
										className="btn btn-success my-sm-0"
										type="submit"
									>
										Search
									</button>
								</div>
							</form>
						</li>
					</ul>
					{location.pathname.includes("/my") ? (
						<button
							className="btn btn-light  my-2 my-sm-0 mx-2"
							onClick={goToMyEvents}
						>
							My events
						</button>
					) : (
						<button
							className="btn btn-outline-light  my-2 my-sm-0 mx-2"
							onClick={goToMyEvents}
						>
							My events
						</button>
					)}
					{props.uid == null ? (
						<button
							className="btn btn-success my-2 my-sm-0"
							onClick={signInWithGoogle}
						>
							Sign in
						</button>
					) : (
						<button
							className="btn btn-danger my-2 my-sm-0"
							onClick={signout}
						>
							Sign out
						</button>
					)}
				</div>
			</nav>
		</div>
	);
};

export { NavbarBase };
