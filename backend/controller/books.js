const Book = require("../models/Book");

//@route    POST /api/v1/books
//desc      Create all books
//access    Private
exports.createSingleBooks = async (req, res, next) => {
  console.log(req.body);
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

//@route    GET /api/v1/books
//desc      GET all books
//access    Private
exports.getAllBooks = async (req, res, next) => {
  try {
    const book = await Book.find();
    res.status(200).json({
      success: true,
      // count: book.length,
      data: book,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@route    GET /api/v1/books
//desc      GET single books
//access    Private
exports.getSingleBooks = async (req, res, next) => {
  try {
    const book = await Book.find({
      bookName: new RegExp(req.params.bookName, "i"),
    });
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@route    PUT /api/v1/books
//desc      Update single books
//access    Private
exports.updateSingleBooks = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@route    DELETE /api/v1/books
//desc      Dalete single books
//access    Private
exports.deleteSingleBooks = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete(req.params.id);

    if (!book) {
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
