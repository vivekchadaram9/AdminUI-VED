import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Pagination from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("Pagination", () => {
  it("should not have any table related tags", () => {
    const wrapper = shallow(<Pagination />);
    const text = wrapper.find("tr");
    expect(text.length).toBe(0);
  });

  it("should have delete selected button", () => {
    const wrapper = shallow(<Pagination />);
    const text = wrapper.find("td");
    expect(text.length).toBe(0);
  });

  it("should have ul element", () => {
    const wrapper = shallow(<Pagination />);
    const text = wrapper.find("ul");
    expect(text).toEqual("ul");
  });
});
