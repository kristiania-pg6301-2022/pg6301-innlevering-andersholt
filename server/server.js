import express from "express";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";
import * as path from "path";

const app = express();

app.get("/api/question", (req, res) => {
  const { id, category, question, answers } = randomQuestion();
  res.json({ id, question, answers, category });
});

// callback: (req, res) => {}
app.post("/api/question", (req, res) => {
  const { id, answer } = req.body;
  const question = Questions.find((q) => q.id === id);

  if (!question) {
    return res.sendStatus(404);
  }

  if (isCorrectAnswer(question, answer)) {
    return res.json({ result: "correct" });
  } else {
    return res.json({ result: "incorrect" });
  }
});

//middleware for dist file
app.use(express.static(path.resolve("../client/dist")));

//middleware for correct path: /api or not
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

//assigning port
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server started on port http://localhost:${server.address().port}`
  );
});
