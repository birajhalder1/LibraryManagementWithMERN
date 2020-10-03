const User = require("../models/User");
const Book = require("../models/Book");

//@route    POST /api/v1/user
//desc      Create user record
//access    Private
exports.createSingleUserRecords = async (req, res, next) => {
  try {
    /**query to get book id */
    // console.log(req.body);
    // const bookId = await Book.findOne({
    //   bookName: req.body.bookName,
    //   authorName: req.body.authorName,
    // });
    // console.log(bookId._id);
    const user = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      book: req.body.book,
    };
    // Save to database
    let newUser = new User(user);
    newUser.save().then((result) => {
      res.json("Data successfully saved..!!");
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@route    GET /api/v1/user
//desc      GET all user records
//access    Private
exports.getAllUserRecords = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@route    GET /api/v1/user
//desc      GET single user records
//access    Private
exports.getSingleUserRecords = async (req, res, next) => {
  try {
    // console.log("hitt");
    // console.log(req.params);
    // const user = await User.find({ name: req.params.name });
    const user = await User.find({ name: new RegExp(req.params.name, "i") });
    // console.log(user);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@route    PUT /api/v1/user
//desc      Update user record
//access    Private
exports.updateUserRecord = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@route    DELETE /api/v1/user
//desc      Dalete user account
//access    Private
exports.deleteUserAccount = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete(req.params.id);

    if (!user) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
