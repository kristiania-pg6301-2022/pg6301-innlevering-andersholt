import * as React from "react";
import { Link } from "react-router-dom";
import { fetchJSON, postJSON } from "./http";
import { useLoader } from "./useLoader";

export function FrontPage() {
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

export function Question() {
  const { reload, loading, error, data } = useLoader(
    async () => await fetchJSON("api/question")
  );

  const question = data;

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div> An error occurred: {error.toString()} </div>;
  }

  async function handleAnswer(answer) {
    const { id } = question;

    await postJSON("api/question", { id, answer });

    await reload();
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
      <Link to={"/score"}>Show current score</Link>
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

export function ShowScore() {
  const { loading, error, data } = useLoader(
    async () => await fetchJSON("api/score")
  );

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div> An error occurred: {error.toString()} </div>;
  }

  const { answered, correct } = data;

  return (
    <div>
      <h1>
        You have: {correct} correct, out of: {answered} answers
      </h1>
      <div>
        <Link to={"/question"}>Answer another question</Link>
      </div>
      <Link to={"/"}>Go Back to frontpage</Link>
    </div>
  );
}
