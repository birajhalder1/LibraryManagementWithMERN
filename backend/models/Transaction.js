const moongoose = require("mongoose");

const borrowSchema = new moongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  transactionReturn: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = moongoose.model("Transaction", borrowSchema);
