import React from "react";
import ReactDOM, { render } from "react-dom";
import { MemoryRouter } from "react-router-dom";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import request from "supertest";
import "babel-polyfill";

import { FrontPage, Question } from "../application.jsx";

const app = express();
app.use(bodyParser.json);
app.use(cookieParser("test secret"));
app.use("/question", Question);

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
