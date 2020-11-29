import React, { useState } from "react";
import "../css/searchPage.css";
import hamburger from "../resources/icons/hamburger.svg";
import { WeddingResult } from "../components/WeddingResult";

const SearchPageBase = (props) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	function openSidePanel() {
		document.getElementById("filters").style.width = "250px";
		// document.getElementById("results").style.marginLeft = "250px";
		document.getElementById("hamburger-btn").style.marginLeft = "250px";
	}

	/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
	function closeSidePanel() {
		document.getElementById("filters").style.width = "0";
		// document.getElementById("results").style.marginLeft = "0";
		document.getElementById("hamburger-btn").style.marginLeft = "0";
	}

	function toggleFilters() {
		if (isFilterOpen) {
			closeSidePanel();
			setIsFilterOpen(false);
		} else {
			openSidePanel();
			setIsFilterOpen(true);
		}
	}
	return (
		<div className="my-row">
			<button id="hamburger-btn" className="btn" onClick={toggleFilters}>
				<img
					alt="hamburger-icon"
					className="icon"
					src={hamburger}
				></img>
			</button>
			<div id="filters" className="border column">
				<h3 className="text-center">Filters</h3>
				<hr className="hr-black w-100" />
			</div>
			<div id="results" className="column p-sm-0 p-lg-5 w-100 h-100">
				{props.results.map((result, i) => (
					<WeddingResult key={result.id} data={result} />
				))}
			</div>
		</div>
	);
};

export { SearchPageBase };
