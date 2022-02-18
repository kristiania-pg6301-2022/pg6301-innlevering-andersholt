import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { useState } from "react";

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

async function Question() {
  const [question, setQuestion] = useState();
  const res = await fetch("/api/question");
  setQuestion(res);
  return (
    <div>
      <h3>{question.question}</h3>
      <p>{question.answers}</p>
    </div>
  );
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
