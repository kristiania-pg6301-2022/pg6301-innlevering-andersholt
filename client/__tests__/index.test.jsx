import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import "babel-polyfill";

import { FrontPage } from "../application.jsx";

describe("Quiz game Innlevering", () => {
  it("displays homepage", () => {
    const element = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
      element
    );

    expect(element.innerHTML).toMatchSnapshot();
  });
});
