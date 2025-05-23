const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  genre: String,
  summary: String,
  isbn: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
