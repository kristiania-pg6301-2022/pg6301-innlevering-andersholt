import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { FrontPage, Question, ShowScore } from "./application.jsx";
import { fetchJSON } from "./http";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route
          path={"/question"}
          element={<Question getQuestion={getQuestion} />}
        />
        <Route path={"/score"} element={<ShowScore />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
