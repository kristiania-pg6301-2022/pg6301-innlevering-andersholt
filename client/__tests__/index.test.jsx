import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

import { FrontPage } from "../application.jsx";

describe("index", () =>
  it("displays homepage", () => {
    const element = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
      element
    );

    console.log(
      <MemoryRouter>
        <FrontPage></FrontPage>
      </MemoryRouter>
    );

    expect(element.querySelector("h1").innerHTML).toEqual("Kristiania Quiz");
    expect(element.innerHTML).toMatchSnapshot();
  }));
