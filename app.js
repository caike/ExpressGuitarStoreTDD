"use strict";

const express = require("express");
const app = express();
const DB = require("./db");

let NODE_ENV = process.env.NODE_ENV;
if(NODE_ENV != undefined) {
  app.set("env", NODE_ENV);
}

app.get("/guitars", (request, response) => {
  let guitars = DB.getAll();
  response.json(guitars);
});

module.exports = app;
