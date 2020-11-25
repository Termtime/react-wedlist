import React from "react";
import { useHistory } from "react-router-dom";
import "../css/loginPage.css";
const LoginPageBase = (props) => {
	const history = useHistory();
	async function loginWithGoogle(e) {
		if (e) e.preventDefault();
		if (await props.firebase.signInWithGoogle()) {
			history.push("/app");
		}
	}

	return (
		<div id="loginPage" className="my-row center h-100">
			<div id="loginCard" className="text-center column text-white">
				<div>
					<h1>Sign In</h1>
					<h5>to continue...</h5>

					<div className="center">
						<button
							className="btn btn-primary"
							onClick={loginWithGoogle}
						>
							Sign In with Google
						</button>
					</div>
					<div className="center row divider">
						<hr className="col-2 w-auto ml-auto mr-0" />
						<span className="text-center col-1 w-auto m-0 p-0">
							Or
						</span>
						<hr className="d-inline-block col-2 ml-0 mr-auto" />
					</div>
					<div className="center">
						<button className=" btn btn-success">
							Use the demo account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export { LoginPageBase as LoginPage };