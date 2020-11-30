import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/AppPage.css";

const AppPageBase = (props) => {
	return (
		<div>
			<h1>My events</h1>
			<p>
				Search event by email, name, see "more bought" items suggestions
			</p>
		</div>
	);
};

export { AppPageBase as AppPage };
