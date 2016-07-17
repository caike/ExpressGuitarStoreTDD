"use strict";

const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send([]);
});

module.exports = app;
