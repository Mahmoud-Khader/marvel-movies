"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logger = require("./auth/middleware/logger.js");

const authRoutes = require("./auth/routes/routes.js");

const errorHandler500 = require("./error-handlers/500.js");
const notFound404 = require("./error-handlers/404.js");
const marvelMovie = require("./auth/routes/marvelMovie");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use(marvelMovie);
app.use(authRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Working...");
});

app.get("/bad", (req, res, next) => {
  next("Error Bad End Point");
});

app.use("*", notFound404);
app.use(errorHandler500);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error("Port Not Found");
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};