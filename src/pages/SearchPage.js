import React, { useEffect } from "react";
import "../styles/searchPage.css";
import { WeddingResult } from "../components/WeddingResult";
import { FilterOptions } from "../containers/FilterOptions";

const SearchPageBase = (props) => {
	useEffect(() => {
		return () => {
			console.log("Exiting search page");
			props.clearResults();
		};
	}, []);
	return (
		<div className="my-row">
			<FilterOptions />
			<div id="results" className="column p-sm-0 m-sm-2 p-lg-5 w-100">
				{props.results.map((result, i) => (
					<WeddingResult key={result.id} data={result} />
				))}
				{props.results.length === 0 ? (
					<div className="row center w-100">
						<h3>
							We could not find any weddings with your search
							filters.
						</h3>
					</div>
				) : null}
			</div>
		</div>
	);
};

export { SearchPageBase };
