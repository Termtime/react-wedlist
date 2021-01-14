import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../router/routes";
import "../styles/navbar.css";

const NavbarBase = (props) => {
	const history = useHistory();
	const [searchQuery, setSearchQuery] = useState("");

	const signInWithGoogle = () => {
		history.push(ROUTES.SIGNIN);
	};

	const signout = async () => {
		console.log("logging out");
		if (await props.firebase.logout()) {
			console.log("logogut success");
			history.push(ROUTES.LANDING);
		}
	};

	const search = async (e) => {
		if (e) e.preventDefault();
		if (searchQuery === "") {
			return;
		}
		let query = searchQuery;
		let results = [];
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
	};

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
										id="search-bar"
										className="form-control mr-sm-2"
										type="search"
										placeholder="Search"
										aria-label="Search"
										value={searchQuery}
										onChange={(e) =>
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
					{props.uid ? (
						<span className="text-white mx-4">
							{props.user.displayName
								? "Welcome, " + props.user.displayName
								: "Welcome, " +
								  props.user.email.substring(
										0,
										props.user.email.indexOf("@")
								  )}
						</span>
					) : null}
					{props.uid == null ? (
						<button
							id="login-btn"
							className="btn btn-success my-2 my-sm-0"
							onClick={signInWithGoogle}
						>
							Sign in
						</button>
					) : (
						<button
							id="logout-btn"
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
