const Transaction = require("../models/Transaction");

//@route    POST /api/v1/user
//desc      Create user record
//access    Private
exports.createSingleTransactionRecords = async (req, res, next) => {
  try {
    const transactionData = {
      name: req.body.name,
      userId: req.body.userId,
      transactionReturn: req.body.transactionReturn,
    };

    // Save to database
    let newTransaction = new Transaction(transactionData);
    newTransaction.save().then((result) => {
      res.json("Data successfully saved..!!");
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
//@route    GET /api/v1/user
//desc      GET all user records
//access    Private
exports.getAllUserTransactionRecords = async (req, res, next) => {
  try {
    // console.log("hitt");
    const transaction = await Transaction.find()
      .populate("userId")
      .sort({ _id: -1 });
    res.status(200).json({
      count: transaction.length,
      success: true,
      data: transaction,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
