import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import "babel-polyfill";

import { FrontPage, Question, ShowScore } from "../application.jsx";

describe("Frontpage", () => {
  it("displays correct content", () => {
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
describe("Score", () => {
  it("displays right content", () => {
    const element = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <ShowScore />
      </MemoryRouter>,
      element
    );

    expect(element.innerHTML).toMatchSnapshot();
  });
});

describe("Question", () => {
  it("displays right content", () => {
    const element = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <Question />
      </MemoryRouter>,
      element
    );
  });
});
