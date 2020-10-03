const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Please add a book name"],
    unique: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  authorName: {
    type: String,
    required: [true, "Please add author name"],
    unique: true,
    maxlength: [50, "Author name can not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add book description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  currentAvailibility: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Book", BookSchema);
