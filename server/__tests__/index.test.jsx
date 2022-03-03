import express from "express";
import bodyParser from "body-parser";
import request from "supertest";
import { Question } from "../server.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/question", Question);

describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const res = await request(app).get("/api/question");
    expect(res.statusCode).toEqual(404);
  });
});
