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

describe("Creating guitars", () => {

  let createGuitar = (name) => {
      return request(app)
        .post("/guitars")
        .set("Content-Type", "application/json")
        .send(JSON.stringify({ guitar: { name }}))
  };

  describe("with valid data", () => {
    it("returns status code 201", (done) => {
      createGuitar("PRS")
        .expect(201, done);
    });

    it("increases guitars count from DB", (done) => {
      let initialCount = DB.getAll().length;
      createGuitar("PRS")
        .expect(() => {
          let newCount = DB.getAll().length;
          if(initialCount != (newCount - 1)){
            throw new Error("Did not create new guitar");
          }
        })
        .end(done);
    });

    it("Adds new guitar from payload", (done) => {
      createGuitar("PRS")
        .expect(() => {
          if(!DB.getAll().find((e) => e === "PRS")){
            throw new Error("Did not Add PRS");
          }
        })
        .end(done);
    });
  });

});

