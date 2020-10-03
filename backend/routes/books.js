const express = require("express");
const {
  createSingleBooks,
  getAllBooks,
  getSingleBooks,
  updateSingleBooks,
  deleteSingleBooks,
} = require("../controller/books");
const route = express.Router();

route.route("/").post(createSingleBooks).get(getAllBooks);

route
  .route("/:bookName")
  .get(getSingleBooks)
  .put(updateSingleBooks)
  .delete(deleteSingleBooks);

module.exports = route;
