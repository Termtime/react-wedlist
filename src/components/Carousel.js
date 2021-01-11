import React from "react";

export const Carousel = (props) => {
	const { slides, id } = props;
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
							className={`d-block w-100 h-100 ${
								slide.styleClasses
									? slide.styleClasses.join(" ")
									: ""
							}`}
							src={slide.src}
							alt={`slide ${index + 1}`}
						/>
						{slide.caption ? (
							<div className="carousel-caption d-block">
								<h1>{slide.caption}</h1>
								{slide.subCaption ? (
									<p>{slide.subCaption}</p>
								) : null}
							</div>
						) : null}
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
