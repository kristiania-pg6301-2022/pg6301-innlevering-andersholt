import express from "express";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";
import * as path from "path";

const app = express();

app.get("/api/question", (req, res) => {
  const { id, category, question, answers } = randomQuestion();
  res.json({ id, question, answers, category });
});

app.post("/api/question", (req, res, next) => {
  const { id, answer } = req.body;
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answered: 0, correct: 0 };
  const question = Questions.find((q) => q.id == id);
  if (!question) {
    return res.status(404);
  }

  score.answered += 1;
  if (isCorrectAnswer(question, answer)) {
    score.correct += 1;
    res.cookie("score"), JSON.stringify(score), { signed: true };
    return res.json({ result: "correct" });
  } else {
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "incorrect" });
  }
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server started on port http://localhost:${server.address().port}`
  );
});
