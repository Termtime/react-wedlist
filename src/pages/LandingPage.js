import React from "react";
import "../css/landingPage.css";
import { Carousel } from "../components/Carousel";
import wed1 from "../resources/img/wedding-1.jpg";
import wed2 from "../resources/img/wedding-2.jpg";
import wed3 from "../resources/img/wedding-3.jpg";
const LandingPageBase = (props) => {
	const homepageSlides = [{ src: wed1 }, { src: wed2 }, { src: wed3 }];
	return (
		<div>
			<Carousel slides={homepageSlides} id="homePage-carousel"></Carousel>
		</div>
	);
};
export { LandingPageBase as LandingPage };
