"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const DB = require("./db");

let NODE_ENV = process.env.NODE_ENV;
if(NODE_ENV != undefined) {
  app.set("env", NODE_ENV);
}

app.get("/guitars", (request, response) => {
  let guitars = DB.getAll();
  response.json(guitars);
});

app.post("/guitars", bodyParser.json(), (request, response) => {
  let currentGuitars = DB.getAll();
  let body = request.body;
  let guitar = body.guitar || {};

  if(guitar.name !== undefined){
    currentGuitars.push(guitar.name);
    DB.loadData(currentGuitars);
  }

  response.sendStatus(201);
});

module.exports = app;
