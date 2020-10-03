const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  username: {
    type: String,
    required: [true, "Please add a username"],
    unique: true,
    maxlength: [50, "User name can not be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },

  // book: String,
  // author: String,
  // books: {
  //   book: [
  //     {
  //       bookName: String,
  //       authorName: String,
  //     },
  //   ],
  // },
  phone: {
    type: Number,
    required: [true, "Please add a phone number"],
    unique: true,
    maxlength: [10, "Phone number can not be more than 10 characters"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
