// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create a new book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/borrowed', async (req, res) => {
  try {
    const borrowedBooks = await Book.find({ availability_status: 'Borrowed' });
    res.json(borrowedBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/available', async (req, res) => {
  try {
    const availableBooks = await Book.find({ availability_status: 'Available' });
    res.json(availableBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single book
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Update a book
router.put('/:id', getBook, async (req, res) => {
  Object.assign(res.book, req.body);
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book;
  next();
}

module.exports = router;