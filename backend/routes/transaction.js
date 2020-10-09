const express = require("express");
const {
  getAllUserTransactionRecords,
  createSingleTransactionRecords,
} = require("../controller/transaction");

const route = express.Router();

route
  .route("/")
  .post(createSingleTransactionRecords)
  .get(getAllUserTransactionRecords);

module.exports = route;
