const request = require("supertest");
const express = require("express");
const app = express();

const searchRouter = require("../dist/routes/getMakes");

app.use("/getMakes", searchRouter);

describe("getMakes Endpoint", () => {
  it("should return an array of makes with status 200", async () => {
    const expectedResponse = {};

    const response = await request(app).get("/getMakes");
    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });
});
