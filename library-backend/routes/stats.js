// routes/stats.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const availableBooks = await Book.countDocuments({ availability_status: 'Available' });
    const borrowedBooks = await Book.countDocuments({ availability_status: 'Borrowed' });

    const totalTransactions = await Transaction.countDocuments();
    const activeTransactions = await Transaction.countDocuments({ return_date: { $exists: false } });

    res.json({
      totalBooks,
      availableBooks,
      borrowedBooks,
      totalTransactions,
      activeTransactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// routes/stats.js

router.get('/monthly-borrows', async (req, res) => {
  try {
    const monthlyBorrows = await Transaction.aggregate([
      {
        $group: {
          _id: { $month: '$borrow_date' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id': 1 } },
    ]);
    res.json(monthlyBorrows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;