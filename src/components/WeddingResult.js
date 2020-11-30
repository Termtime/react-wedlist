import React from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../router/routes";
const moment = require("moment");

const WeddingResultBase = (props) => {
	const { data } = props.data;
	const { id } = props.data;
	const history = useHistory();
	console.log("Result id", id);
	function goToDetails() {
		console.log("I WAS CLICKED");
		// let route = "" + ROUTES.DETAIL;
		// route = route.replace("wedding", id);
		console.log(ROUTES.DETAIL.replace(":wedId", id));
		history.push(ROUTES.DETAIL.replace(":wedId", id));
	}
	const ceremonyDate = moment
		.unix(data.ceremonyDate.seconds)
		.format("DD/MM/YYYY [at] hh:mm A");
	console.log(ceremonyDate);
	const receptionDate = moment
		.unix(data.receptionDate.seconds)
		.format("DD/MM/YYYY [at] hh:mm A");
	return (
		<div className="card center-self my-row">
			<div className="card-body w-100">
				<h5 className="card-title">{data.name}</h5>
				<div>
					<p className="card-text">
						Ceremony: {data.ceremonyPlace}
						<br />
						<small>Date:{" " + ceremonyDate}</small>
					</p>
					<p className="card-text">
						Reception: {data.receptionPlace}
						<br />
						<small>Date: {" " + receptionDate}</small>
					</p>
				</div>
				<div className="my-2">
					<button className="btn btn-primary" onClick={goToDetails}>
						More details
					</button>
				</div>
				<label>Tags:</label>
				<div className="tags my-row">
					{data.themes.map((theme, i) => (
						<span
							key={i}
							className="color-reactive-red mr-1 badge badge-pill text-capitalize badge-primary"
						>
							{theme}
						</span>
					))}
				</div>
			</div>
			<div className="img-container w-auto">
				<img
					src={data.posterURL}
					alt="poster"
					className="posterImg w-100"
				/>
			</div>
		</div>
	);
};

export { WeddingResultBase as WeddingResult };
