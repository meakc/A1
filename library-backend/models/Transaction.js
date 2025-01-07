// models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  borrow_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  return_date: {
    type: Date,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);