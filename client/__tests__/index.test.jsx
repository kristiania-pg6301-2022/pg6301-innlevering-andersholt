import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import "babel-polyfill";

import {
  FrontPage,
  Question,
  QuestionApiContext,
  ShowScore,
} from "../application.jsx";
import { act, Simulate } from "react-dom/test-utils";
import { postJSON } from "../http";

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

    const postAnswer = jest.fn();
    /*    function getQuestion() {
      return new Promise((resolve, reject) => {
        return;
        reject("Hello");
        resolve({
          question: "What is react?",
          answers: {
            answer_a: "Fun",
            answer_b: "Boring",
          },
        });
      }).then(res => {
        return res.question
      });
    }*/
    async function getQuestion() {
      return {
        question: "What is react?",
        answers: {
          answer_a: "Fun",
          answer_b: "Boring",
        },
      };
    }

    await act(async () => {
      ReactDOM.render(
        <QuestionApiContext.Provider value={{ getQuestion, postAnswer }}>
          <MemoryRouter>
            <Question />
          </MemoryRouter>
        </QuestionApiContext.Provider>,
        element
      );
    });
    expect(element.innerHTML).toMatchSnapshot();
    expect(postAnswer).not.toHaveBeenCalled();
  });

  it("should return answer", async () => {
    const element = document.createElement("div");

    const postAnswer = jest.fn();
    async function getQuestion() {
      return {
        question: "What is react?",
        answers: {
          answer_a: "Fun",
          answer_b: "Boring",
        },
      };
    }

    await act(async () => {
      ReactDOM.render(
        <QuestionApiContext.Provider value={{ getQuestion, postAnswer }}>
          <MemoryRouter>
            <Question />
          </MemoryRouter>
        </QuestionApiContext.Provider>,
        element
      );
    });
    await act(async () => {
      await Simulate.click(
        element.querySelector("button[data-testid=answer_a]")
      );
    });
    expect(postAnswer).toHaveBeenCalled();
  });
});
