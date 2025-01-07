// models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publication_year: {
    type: Number,
    required: true,
  },
  availability_status: {
    type: String,
    enum: ['Available', 'Borrowed'],
    default: 'Available',
  },
});

module.exports = mongoose.model('Book', BookSchema);