import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "../api/amazonwishlist";
import { Carousel } from "../components/Carousel";
import { Mapbox } from "../components/Mapbox";
import "../css/weddingDetailPage.css";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

const axios = require("axios").default;
const $ = require("jquery");
const WeddingDetailPageBase = (props) => {
	const { wedId } = useParams();
	console.log(wedId);
	const [data, setData] = useState(null);
	const [wishlistItems, setWishlistItems] = useState([]);
	const [activeSlide, setActiveSlide] = useState(0);
	const [markerData, setMarkerData] = useState([]);
	const [mapCoords, setMapCoords] = useState({
		lat: 0,
		lng: 0,
	});
	let activeWishlistItem = wishlistItems[activeSlide] || null;

	function getData(weddingId) {
		props.firebase.db
			.collection("weddings")
			.doc(weddingId)
			.get()
			.then((doc) => {
				if (doc) {
					const resData = doc.data();
					setData(resData);
					console.log(resData);
					getWishlistPreview(resData.wishlist);
					const newMarkerData = [...markerData];
					//ceremony location
					newMarkerData.push({
						lat: resData.ceremonyLocation.latitude,
						lng: resData.ceremonyLocation.longitude,
						color: "#2C98D1",
					});

					//reception location
					newMarkerData.push({
						lat: resData.receptionLocation.latitude,
						lng: resData.receptionLocation.longitude,
						color: "#33B928",
					});

					setMarkerData(newMarkerData);
					setMapCoords({
						lat: resData ? resData.ceremonyLocation.latitude : 0,
						lng: resData ? resData.ceremonyLocation.longitude : 0,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function getWishlistPreview(
		wishlistURL = "https://www.amazon.com/hz/wishlist/ls/P0FJWI7NM3T5?ref_=wl_share"
	) {
		const regex = /.+(?=\?)/;
		const wishlistID = wishlistURL
			.split("/")
			[wishlistURL.split("/").length - 1].match(regex)[0];
		console.log(wishlistID);

		const request = endpoint + `wishlist?q=${wishlistID}`;

		console.log(request);
		const response = await axios.get(request, {
			headers: { "Access-Control-Allow-Origin": "*" },
		});

		console.log(response.data.data);

		let items = [];
		response.data.data.map((item) =>
			items.push({
				name: item.name,
				url: item.url,
				price: item.price,
				src: item.image,
			})
		);

		setWishlistItems(items);

		$("#products-wishlist-carousel").on("slide.bs.carousel", function (e) {
			var slideFrom = e.from;
			var slideTo = e.to;

			console.log(`${slideFrom} => ${slideTo}`);
			setActiveSlide(slideTo);
		});
	}

	useEffect(() => {
		getData(wedId);
	}, []);

	if (data) {
		return (
			<div className="col-md-12">
				<div id="title-section" className="row py-5">
					<div className="col">
						<h1 id="title">{data.name}</h1>
						<h4 id="subtitle">
							{`${data.brideName} and ${data.groomName}'s Wedding`}
						</h4>
						<div id="stats" className="col-md-12">
							<small id="assist-counter" className="ml-auto">
								{
									data.invites.filter(
										(invited) => invited.willGo === true
									).length
								}{" "}
								out of {data.invites.length} people are going
							</small>
							<div
								id="invite-button"
								className="row d-block text-center"
							>
								<small className="mr-1 align-self-center">
									Want to be invited?
								</small>
								<button className="btn btn-primary">
									Send a request
								</button>
							</div>
						</div>
					</div>
				</div>
				<div id="details-section" className="row mb-5">
					<div className="col-md-8 pt-5">
						{/* TODO: Wedding details display */}
						<div className="row">
							<span className="p-5 blogText">
								{data.blogText}
							</span>
						</div>
					</div>
					<div id="location-section" className="col-md-4">
						<div>
							<div className="text-center mt-4">
								<h5>Location:</h5>
							</div>
							<div className="row center justify-content-around my-2">
								<div
									className="location-pill"
									onClick={() =>
										setMapCoords({
											lat: data.ceremonyLocation.latitude,
											lng:
												data.ceremonyLocation.longitude,
										})
									}
								>
									<span className="mx-1 badge badge-pill ceremony-indicator">
										&nbsp;
									</span>
									<span>Ceremony: {data.ceremonyPlace}</span>
								</div>
								<div
									className="location-pill"
									onClick={() =>
										setMapCoords({
											lat:
												data.receptionLocation.latitude,
											lng:
												data.receptionLocation
													.longitude,
										})
									}
								>
									<span className="mx-1 badge badge-pill reception-indicator">
										&nbsp;
									</span>
									<span>
										Reception: {data.receptionPlace}
									</span>
								</div>
							</div>
							{markerData.length > 0 ? (
								<Mapbox
									lat={mapCoords.lat}
									lng={mapCoords.lng}
									markers={markerData}
									zoom={10}
								/>
							) : null}
						</div>
					</div>
				</div>
				{wishlistItems.length > 0 ? (
					<div id="wishlist-section" className="row">
						<div id="wishlist-info" className="col-md-8 ">
							<div id="wishlist-info">
								<div className="row">
									<h3>
										{`${data.brideName} and ${data.groomName}'s Wishlist`}
									</h3>
									<small className="align-self-center ml-2">
										<a
											href={data.wishlist}
											className="link"
										>
											more...
										</a>
									</small>
								</div>
								<p>{activeWishlistItem.name}</p>
								<small>{`$ ${activeWishlistItem.price}`}</small>
								<a
									className="btn btn-primary mx-3"
									href={activeWishlistItem.url}
								>
									Gift it!
								</a>
							</div>
						</div>
						<div
							id="carousel-container"
							className="col-md align-self-center"
						>
							<Carousel
								className="product-carousel"
								slides={wishlistItems}
								id="products-wishlist-carousel"
							/>
						</div>
					</div>
				) : null}
			</div>
		);
	} else {
		return null;
	}
};

export { WeddingDetailPageBase as WeddingDetailPage };
