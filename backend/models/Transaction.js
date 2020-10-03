const moongoose = require("mongoose");

const Book = require("./Book");
const User = require("./User");

const borrowSchema = new moongoose.Schema({
  bookId: {
    type: mongoose.Types.ObjectId,
    ref: "Book",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  dueDateOfBook: Date,
});
module.exports = moongoose.model("Transaction", borrowSchema);
