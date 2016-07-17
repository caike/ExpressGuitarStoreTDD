"use strict";

const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send([]);
});

app.listen(8080, () => console.log("Listening"));
