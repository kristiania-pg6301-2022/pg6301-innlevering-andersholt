import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [question, setQuestion] = useState();

  useEffect(async () => {
    const res = await fetch("/api/question");
    setQuestion(await res.json());
  }, []);

  if (!question) {
    return <div>Loading....</div>;
  }

  async function handleAnswer(answer) {
    const { id } = question;
    await fetch("api/question", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id, answer }),
    });
  }

  return (
    <div>
      <h1>{question.question}</h1>
      {Object.keys(question.answers)
        .filter((a) => question.answers[a])
        .map((a) => (
          <div key={a}>
            <button onClick={() => handleAnswer(a)}>
              {question.answers[a]}
            </button>
          </div>
        ))}
    </div>
  );
}

/*function Q() {
  const [question, setQuestion] = useState();

  async function handle() {
    const res = await fetch("/api/question");
    setQuestion(await res.json());
  }

  if (!question) {
    return <div>Loading....</div>;
  }

  return <Question question={question} />;
}*/

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
