import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "../api/amazonwishlist";
import { Carousel } from "../components/Carousel";
import { Mapbox } from "../components/Mapbox";
import "../styles/weddingDetailPage.css";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

const axios = require("axios").default;
const $ = require("jquery");
const WeddingDetailPageBase = (props) => {
	const { wedId } = useParams();
	const [data, setData] = useState(null);
	const [wishlistItems, setWishlistItems] = useState([]);
	const [activeSlide, setActiveSlide] = useState(0);
	const [markerData, setMarkerData] = useState([]);
	const [mapCoords, setMapCoords] = useState({
		lat: 0,
		lng: 0,
	});
	const [isInvited, setIsInvited] = useState(false);
	let activeWishlistItem = wishlistItems[activeSlide] || null;

	function getData(weddingId) {
		props.firebase.db
			.collection("weddings")
			.doc(weddingId)
			.get()
			.then((doc) => {
				if (doc) {
					const resData = doc.data();
					/*
					Response structure:
					{
						invites : [ {username: 'Morgan', email: 'test@test.com'}, {}]
					}
					*/
					if (props.uid) {
						console.log("uid: ", props.uid);
						console.log(
							"is the user invited?:",
							!!resData.invites.find(
								(invited) => invited.uid === props.uid
							)
						);
						setIsInvited(
							!!resData.invites.find(
								(invited) => invited.uid === props.uid
							)
						);
					} else {
						console.log("props.uid was falsy: ", props.uid);
					}

					setData(resData);
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
		//TODO: UNCOMMENT THIS ONCE DONE
		const regex = /.+(?=\?)/;
		const wishlistID = wishlistURL
			.split("/")
			[wishlistURL.split("/").length - 1].match(regex)[0];
		const request = endpoint + `wishlist?q=${wishlistID}`;
		const response = await axios.get(request, {
			headers: { "Access-Control-Allow-Origin": "*" },
		});
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
			let slideTo = e.to;
			setActiveSlide(slideTo);
		});
	}

	useEffect(() => {
		getData(wedId);
	}, [props.uid]);

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
							{isInvited ? (
								<React.Fragment>
									<div className="row center justify-content-around my-2">
										<div
											className="location-pill"
											onClick={() =>
												setMapCoords({
													lat:
														data.ceremonyLocation
															.latitude,
													lng:
														data.ceremonyLocation
															.longitude,
												})
											}
										>
											<span className="mx-1 badge badge-pill ceremony-indicator">
												&nbsp;
											</span>
											<span>
												Ceremony: {data.ceremonyPlace}
											</span>
										</div>
										<div
											className="location-pill"
											onClick={() =>
												setMapCoords({
													lat:
														data.receptionLocation
															.latitude,
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
								</React.Fragment>
							) : (
								<React.Fragment>
									<h5 className="text-center">
										{props.uid
											? "You are not invited to this wedding."
											: "Location info is only available to logged in users."}
									</h5>
									<img
										alt="map-placeholder"
										src="https://i.imgur.com/MHmjkp0.jpg"
										className="mapContainer"
									></img>
								</React.Fragment>
							)}
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
											target="blank"
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
									target="blank"
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
