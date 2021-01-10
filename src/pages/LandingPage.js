import React from "react";
import "../styles/landingPage.css";
import { Carousel } from "../components/Carousel";
import wed1 from "../resources/img/wedding-1.jpg";
import wed2 from "../resources/img/wedding-2.jpg";
import wed3 from "../resources/img/wedding-3.jpg";
const LandingPageBase = (props) => {
	const homepageSlides = [
		{
			src: wed1,
			caption: "Share your lifetime moment with ease.",
			styleClasses: ["darkened-img", "font-roboto"],
		},
		{
			src: wed2,
			caption: "Unite loved ones without worries.",
			styleClasses: ["darkened-img", "font-roboto"],
		},
		{
			src: wed3,
			caption: "Create great memories, together.",
			styleClasses: ["darkened-img", "font-roboto"],
		},
	];
	return (
		<div id="landingPage-container" className="flex-column">
			<Carousel
				slides={homepageSlides}
				id="landingPage-carousel"
			></Carousel>
		</div>
	);
};
export { LandingPageBase as LandingPage };
