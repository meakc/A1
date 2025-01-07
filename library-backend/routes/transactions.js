const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User'); // Include User model

// Borrow a book
router.post('/borrow', async (req, res) => {
  const { book_id, user_id } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(book_id) || !mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ message: 'Invalid book_id or user_id' });
  }

  try {
    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.availability_status === 'Borrowed') {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    book.availability_status = 'Borrowed';
    await book.save();

    const transaction = new Transaction({
      book_id,
      user_id,
      borrow_date: new Date(),
    });
    await transaction.save();

    res.status(201).json({ message: 'Book borrowed successfully', transaction });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Return a book
router.post('/return', async (req, res) => {
  const { book_id, user_id } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(book_id) || !mongoose.Types.ObjectId.isValid(user_id)) {
    console.error('Invalid book_id or user_id:', { book_id, user_id });
    return res.status(400).json({ message: 'Invalid book_id or user_id' });
  }

  try {
    const transaction = await Transaction.findOne({
      book_id,
      user_id,
      return_date: { $exists: false },
    });

    if (!transaction) {
      return res.status(400).json({ message: 'No active borrow transaction found' });
    }

    transaction.return_date = new Date();
    await transaction.save();

    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.availability_status = 'Available';
    await book.save();

    // Delete the transaction after it has been processed
    await Transaction.findByIdAndDelete(transaction._id);

    res.status(200).json({ message: 'Book returned successfully', transaction });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('book_id')
      .populate('user_id');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;