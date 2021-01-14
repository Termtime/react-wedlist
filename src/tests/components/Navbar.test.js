import React from "react";
import { shallow } from "enzyme";
import { NavbarBase } from "../../components/Navbar";
describe("<NavbarBase />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavbarBase />);
	});

	it("Should render", () => {
		shallow(<NavbarBase />);
	});
	it("Should have a search input with id #search-bar", () => {
		const searchBar = wrapper.find("#search-bar");
		expect(searchBar.exists()).toBe(true);
		expect(searchBar.prop("type")).toBe("search");
	});
	it("Writing on the #search-bar should update its value", () => {
		const testValue = "Test";
		// const wrapper = shallow(<input id="search-bar" type="text" />);
		let searchBar = wrapper.find("#search-bar");
		searchBar.simulate("change", { target: { value: testValue } });
		// wrapper.update(); DOES NOT WORK, need to find the element again to get updated value
		searchBar = wrapper.find("#search-bar");
		expect(searchBar.prop("value")).toBe(testValue);
	});
	it("If a user is logged in, it should use its displayName to render a welcome message", () => {
		const mockUid = "123456";
		const mockUser = {
			displayName: "Mario Mejia",
			email: "test@test.com",
		};
		const welcomeString = "Welcome, Mario Mejia";
		wrapper = shallow(<NavbarBase uid={mockUid} user={mockUser} />);
		const greetSpan = wrapper.findWhere(
			(node) => node.type() === "span" && node.text() === welcomeString
		);
		expect(greetSpan.exists()).toBeTruthy();
	});
	it("If a user is logged in and displayName is null, it should use the email username to render a welcome message", () => {
		const mockUid = "123456";
		const mockUser = {
			displayName: null,
			email: "test@test.com",
		};
		const welcomeString = "Welcome, test";
		wrapper = shallow(<NavbarBase uid={mockUid} user={mockUser} />);
		const greetSpan = wrapper.findWhere(
			(node) => node.type() === "span" && node.text() === welcomeString
		);
		expect(greetSpan.exists()).toBeTruthy();
	});
	it("When logged in, it should show a logout button", () => {
		const mockUid = "123456";
		const mockUser = {
			displayName: null,
			email: "test@test.com",
		};
		wrapper = shallow(<NavbarBase uid={mockUid} user={mockUser} />);
		const element = wrapper.find("#logout-btn");
		expect(element.exists()).toBeTruthy();
	});
	it("When logged out, it should show a login button", () => {
		const mockUid = null;
		const mockUser = null;
		wrapper = shallow(<NavbarBase uid={mockUid} user={mockUser} />);
		const element = wrapper.find("#login-btn");
		expect(element.exists()).toBeTruthy();
	});
});
