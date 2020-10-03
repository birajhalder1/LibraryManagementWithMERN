const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userDetails: {
        type: String
    },
    bookDetails: {
        type: String
    },
    dueDateOfBook: {
        type: String
    },
    returnStatement: {
        type: String
    }
});
module.exports = mongoose.model("Transaction", transactionSchema);