import { shallow } from "enzyme";
import React from "react";
import { WeddingResult } from "../../components/WeddingResult";
import { weddingResultMockData } from "../jest.mockData";

describe("<WeddingResult/>", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<WeddingResult data={weddingResultMockData} />);
	});

	it("Should render", () => {
		wrapper = shallow(<WeddingResult data={weddingResultMockData} />);
		expect(wrapper.children().length).toBeGreaterThan(0);
	});
});
