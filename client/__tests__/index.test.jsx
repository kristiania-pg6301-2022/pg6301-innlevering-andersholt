import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import "babel-polyfill";

import { FrontPage, Question, ShowScore } from "../application.jsx";
import { act } from "react-dom/test-utils";

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
  it("displays right content", async () => {
    const element = document.createElement("div");

    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <Question />
        </MemoryRouter>,
        element
      )
    );
  });
});
