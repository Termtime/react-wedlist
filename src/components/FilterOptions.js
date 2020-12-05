import React, { useEffect, useState } from "react";
import { BsTrashFill, BsCheck, BsList } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { FILTER_CHANGE } from "../reducers/filters/filtersActions";
import { searchWithFilters } from "../reducers/search/searchActions";

export const FilterMenuBase = (props) => {
	const [filters, setFilters] = useState(props.filters);
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(true);

	function openSidePanel() {
		document.getElementById("filters").style.left = "0px";
		document.getElementById("filterToggleButton").style.marginLeft =
			"250px";
	}
	function closeSidePanel() {
		document.getElementById("filters").style.left = "-250px";
		document.getElementById("filterToggleButton").style.marginLeft = "0";
	}

	function toggleFilters() {
		if (isFilterMenuOpen) {
			closeSidePanel();
			setIsFilterMenuOpen(false);
		} else {
			openSidePanel();
			setIsFilterMenuOpen(true);
		}
	}

	function applyFilters(e = null) {
		if (
			(filters.dateStart.length > 0 && filters.dateStart.length > 0) ||
			(filters.dateStart.length === 0 && filters.dateStart.length === 0)
		) {
			console.log("setting filters");
			console.log(filters);
			props.setFilters(filters);
			searchWithFilters(
				e,
				props.query,
				props.firebase,
				null,
				props.emitSearch,
				filters
			);
		}
	}

	useEffect(() => {
		return () => props.clearFilters();
	}, []);

	useEffect(() => {
		setFilters(props.filters);
	}, [props.filters]);
	return (
		<React.Fragment>
			<button
				id="filterToggleButton"
				className="mt-1 p-1 btn"
				onClick={toggleFilters}
			>
				<BsList size={35} />
			</button>
			<div id="filters" className="border column">
				<h3 className="text-center">Filters</h3>
				<hr className="hr-black w-100" />
				<div id="filters-container">
					<div className="col ">
						<span>Groom name:</span>
						<input
							type="text"
							className="form-control"
							value={filters.groomName}
							onChange={(e) =>
								setFilters({
									...filters,
									groomName: e.target.value,
								})
							}
						/>
						<span>Bride name:</span>
						<input
							type="text"
							className="form-control"
							value={filters.brideName}
							onChange={(e) =>
								setFilters({
									...filters,
									brideName: e.target.value,
								})
							}
						/>
						<hr />
						<span>Ceremony date between: </span>
						<input
							type="date"
							className="form-control"
							value={filters.dateStart}
							onChange={(e) =>
								setFilters({
									...filters,
									dateStart: e.target.value,
								})
							}
						/>
						<span>and: </span>
						<input
							type="date"
							className="form-control"
							value={filters.dateEnd}
							onChange={(e) =>
								setFilters({
									...filters,
									dateEnd: e.target.value,
								})
							}
						/>
						<div className="row mt-3 mx-1 justify-content-between">
							<button
								className="btn btn-primary"
								onClick={applyFilters}
							>
								Apply <BsCheck />
							</button>
							<button
								className="btn btn-danger"
								onClick={props.clearFilters}
							>
								Clear <BsTrashFill />
							</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
