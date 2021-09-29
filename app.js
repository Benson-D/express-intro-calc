/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

// stats functions
const { findMean, findMedian, findMode } = require("./stats");

// string conversion
const { convertStrNums } = require("./utils");

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  const meanNums = req.query.nums.split(",");
  // debugger;
  if (meanNums.length === 0) {
    throw new BadRequestError(MISSING);
  }

  let mean = findMean(convertStrNums(meanNums));

  return res.json({
    operation: "mean",
    value: mean,
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  const medianNums = req.query.nums.split(",");
  if (medianNums.length === 0) {
    throw new BadRequestError(MISSING);
  }

  let median = findMedian(convertStrNums(medianNums));

  return res.json({
    operation: "median",
    value: median,
  });
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  const modeNums = req.query.nums.split(",");
  if (modeNums.length === 0) {
    throw new BadRequestError(MISSING);
  }

  let mode = findMode(convertStrNums(modeNums));

  return res.json({
    operation: "mode",
    value: mode,
  });
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
