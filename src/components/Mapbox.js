import React, { useEffect, useRef, useState } from "react";

let mapboxgl = require("mapbox-gl");
const styles = {
	satellite: "mapbox://styles/mapbox/satellite-v9",
	streets: "mapbox://styles/mapbox/streets-v11",
	satStreet: "mapbox://styles/mapbox/satellite-streets-v11",
};
export const Mapbox = (props) => {
	const id = props.id || "Mapbox";
	const markers = props.markers || [];
	const map = useRef();
	const [mapState, setMapState] = useState({
		lat: props.lat || 15.5,
		lng: props.lng || -88,
		zoom: props.zoom || 10,
	});

	const mapMove = () => {
		setMapState({
			lat: map.current.getCenter().lat.toFixed(4),
			lng: map.current.getCenter().lng.toFixed(4),
			zoom: map.current.getZoom().toFixed(2),
		});
	};

	useEffect(() => {
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
		map.current = new mapboxgl.Map({
			container: id,
			style: styles.streets,
			center: [mapState.lng, mapState.lat],
			zoom: mapState.zoom,
		});
		map.current.addControl(new mapboxgl.NavigationControl());
		map.current.on("move", mapMove);
		console.log("markers size:", markers.length);
		markers.forEach((marker) => {
			console.log("marker created");
			if (marker.lng === undefined || marker.lat === undefined) return;
			var markerInstance = new mapboxgl.Marker({
				color: marker.color || "#3FB1CE",
			})
				.setLngLat([marker.lng, marker.lat])
				.addTo(map.current);
		});

		return function () {
			map.current.off("move", mapMove);
		};
	}, []);
	return <div id={id} className="mapContainer"></div>;
};
