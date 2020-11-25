import React from "react";

export const Carousel = (props) => {
	const { slides, id } = props;
	console.log("slides", slides);
	return (
		<div id={id} className="carousel slide" data-ride="carousel">
			<div className="carousel-inner">
				{slides.map((slide, index) => (
					<div
						className={`carousel-item ${
							index === 0 ? "active" : ""
						}`}
						key={index}
					>
						<img
							className="d-block w-100"
							src={slide.src}
							alt={`slide ${index + 1}`}
						/>
					</div>
				))}
			</div>
			<a
				className="carousel-control-prev"
				href={`#${id}`}
				role="button"
				data-slide="prev"
			>
				<span
					className="carousel-control-prev-icon"
					aria-hidden="true"
				></span>
				<span className="sr-only">Previous</span>
			</a>
			<a
				className="carousel-control-next"
				href={`#${id}`}
				role="button"
				data-slide="next"
			>
				<span
					className="carousel-control-next-icon"
					aria-hidden="true"
				></span>
				<span className="sr-only">Next</span>
			</a>
		</div>
	);
};
