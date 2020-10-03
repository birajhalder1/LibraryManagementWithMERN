const express = require("express");
const {
  createSingleUserRecords,
  getAllUserRecords,
  getSingleUserRecords,
  updateUserRecord,
  deleteUserAccount,
} = require("../controller/user");
const route = express.Router();

route.route("/").post(createSingleUserRecords).get(getAllUserRecords);

route.route("/:name").get(getSingleUserRecords).put(updateUserRecord);

route.route("/:id").delete(deleteUserAccount);

module.exports = route;
