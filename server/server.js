import express from "express";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";
import * as path from "path";

const app = express();

app.get("/api/question", (req, res) => {
  const { id, category, question, answers } = randomQuestion();
  res.json({ id, question, answers, category });
});

app.use(express.static(path.resolve("../client/dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
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
