import express from "express";
import { randomQuestion } from "./questions.js";

const app = express();

app.get("/api/question", (req, res) => {
  const { question, answers } = randomQuestion();

  res.json({ question, answers });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server started on port http://localhost:${server.address().port}`
  );
});
