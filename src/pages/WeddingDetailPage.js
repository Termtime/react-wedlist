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
					// getWishlistPreview();
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
	}

	useEffect(() => {
		getData(wedId);
	}, []);

	$("#products-wishlist-carousel").on("slide.bs.carousel", function (e) {
		var slideFrom = e.from;
		var slideTo = e.to;

		console.log(`${slideFrom} => ${slideTo}`);
		setActiveSlide(slideTo);
	});
	if (data) {
		return (
			<div>
				<div className="my-row">
					<div id="details-section" className="col-sm-12 col-md-8">
						{/* TODO: Wedding details display */}
						<div className="row pt-5 mt-5">
							<div className="col-8">
								<h1 className="pl-3 text-truncate">
									{data.name}
								</h1>
							</div>
							<div className="col-4">
								<h5 className="align-self-end ml-auto pr-3">
									{
										data.invites.filter(
											(invited) => invited.willGo === true
										).length
									}{" "}
									out of {data.invites.length} people are
									going
								</h5>
								<div className="row">
									<small className="mr-1 align-self-center">
										Want to be invited?
									</small>
									<button className="btn btn-info">
										Send a request
									</button>
								</div>
							</div>
						</div>
						<div className="row">
							<span className="p-5 blogText">
								{data.blogText}
							</span>
						</div>
					</div>
					<div id="location-section" className="col-4 ">
						<div className="text-center mt-4">
							<h2>Location:</h2>
						</div>
						<div className="row center center my-4">
							<span className="badge badge-pill badge-primary">
								Ceremony: {data.ceremonyPlace}
							</span>
							<div>
								<span className="badge badge-pill circle-indicator">
									{" "}
								</span>
								<span>Reception: {data.receptionPlace}</span>
							</div>
						</div>
						{markerData.length > 0 ? (
							<Mapbox
								lat={data.ceremonyLocation.latitude || 0}
								lng={data.ceremonyLocation.longitude || 0}
								markers={markerData}
								zoom={10}
							/>
						) : null}
					</div>
				</div>
				<div id="wishlist-section" className="my-row">
					<div className="col-8 ">
						{/* TODO: Wishlist navigation button and label */}
						{wishlistItems.length > 0 ? (
							<div id="wishlist-info">
								<h3>{`${data.brideName} and ${data.groomName}'s Wishlist`}</h3>
								<p>{activeWishlistItem.name}</p>
								<small>{`$ ${activeWishlistItem.price}`}</small>
								<a
									className="btn btn-primary mx-3"
									href={activeWishlistItem.url}
								>
									Gift it!
								</a>
							</div>
						) : null}
					</div>
					<div
						id="carousel-container"
						className="col-4 align-self-center"
					>
						{/* TODO: Amazon wishlist products list */}
						{wishlistItems.length > 0 ? (
							<Carousel
								className="product-carousel"
								slides={wishlistItems}
								id="products-wishlist-carousel"
							/>
						) : null}
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export { WeddingDetailPageBase as WeddingDetailPage };
