import React from "react";
import { Carousel } from "../components/Carousel";

const WeddingDetailPageBase = (props) => {
	return (
		<div>
			<div className="my-row">
				<div id="location-info" className="col-4 bg-dark h-100 w-100 ">
					{/* TODO: Google Maps API box */}
					&nbsp;
				</div>
				<div id="details" className="col-8 bg-primary">
					{/* TODO: Wedding details display */}
					&nbsp;
				</div>
			</div>
			<div id="products-wishlist" className="my-row">
				<div className="col-8 bg-warning">
					{/* TODO: Amazon wishlist products list */}
					<Carousel slides={[]} id="products-wishlist-carousel" />
				</div>
				<div className="col-4 bg-secondary">
					{/* TODO: Wishlist navigation button and label */}
					&nbsp;
				</div>
			</div>
		</div>
	);
};

export { WeddingDetailPageBase as WeddingDetailPage };
