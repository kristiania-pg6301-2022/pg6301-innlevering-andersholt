import React from "react";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import request from "supertest";
import { Question } from "../../client/application";

const app = express();
app.use(bodyParser.json);
app.use(cookieParser("test secret"));
app.use("", Question);

describe("express", () =>
  it("returns a random question", async () => {
    const response = await request(app).get("/api/question");
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      answers: expect.any(Object),
      category: expect.any(String),
    });
    expect(response.body).not.toHaveProperty("correct_answers");
  }));
