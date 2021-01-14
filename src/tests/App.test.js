import { shallow } from "enzyme";
import { App } from "../App";
import React from "react";

describe("<App />", () => {
	it("Should render", () => {
		shallow(<App />);
	});
});
