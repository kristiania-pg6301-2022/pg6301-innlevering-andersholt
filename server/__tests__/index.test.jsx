import request from "supertest";
import app from "../server";
import { handler } from "../server";
jest.setTimeout(10000);

afterAll(() => {
  handler();
});
describe("Get score", () => {
  it("should return correct statuscode and body", async () => {
    const res = await request(app).get("/api/score");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ answered: 0, correct: 0 });
  });
});

describe("Get question", () => {
  it("should return correct statuscode and body", async () => {
    const res = await request(app).get("/api/question");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      answers: expect.any(Object),
      category: expect.any(String),
    });
    expect(res.body).not.toHaveProperty("correct_answers");
  });
});

describe("Post question", () => {
  it("should return correct statuscode and body", async () => {
    const res = await request(app)
      .post("/api/question")
      .send({ id: 974, answer: "answer_b" });
    expect(res.body).toMatchObject({ result: "correct" });
    expect(res.statusCode).toEqual(200);
  });
});
