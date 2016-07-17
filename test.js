"use strict";

const request = require("supertest");
const app = require("./app");

const DB = require("./db");

before(() => {
  DB.loadData(["Fender", "Gibson", "Jackson"]);
});

describe("Listing guitars", () => {

  it("returns status code 200", (done) => {
    request(app)
      .get("/guitars")
      .expect(200, done);
  });

  it("returns JSON format", (done) => {
    request(app)
      .get("/guitars")
      .expect("Content-Type", /json/, done);
  });

  it("returns three guitars", (done) => {
    request(app)
      .get("/guitars")
      .expect(["Fender", "Gibson", "Jackson"], done);
  });

});

