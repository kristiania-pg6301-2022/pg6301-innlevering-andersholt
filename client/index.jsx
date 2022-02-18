import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>Kristiania Quiz</h1>
      <div>
        <Link to={"/question"}>Answer a question</Link>
      </div>
      <div>
        <Link to={"/score"}>Show Score</Link>
      </div>
    </div>
  );
}

function Question() {
  return null;
}

function ShowScore() {
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/question"} element={<Question />} />
        <Route path={"/score"} element={<ShowScore />} />
      </Routes>
    </BrowserRouter>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));
