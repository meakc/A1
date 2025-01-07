import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import ModalPopup from './ModalPopup'; // Import the ModalPopup component
import './CommonStyles.css'; // Import common styles

function BorrowBook() {
  const [transaction, setTransaction] = useState({
    book_id: '',
    user_id: '',
    transaction_id: '',
  });
  const [action, setAction] = useState('borrow'); // 'borrow' or 'return'
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fetchBooks = useCallback(() => {
    setLoadingBooks(true);
    const endpoint = action === 'borrow' ? 'available' : 'borrowed';
    axios.get(`https://library-backend-9f7k.onrender.com/books/${endpoint}`)
      .then((res) => {
        setBooks(res.data);
        setLoadingBooks(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch books.');
        setLoadingBooks(false);
      });
  }, [action]);

  const fetchUsers = useCallback(() => {
    setLoadingUsers(true);
    axios.get('https://library-backend-9f7k.onrender.com/users')
      .then((res) => {
        setUsers(res.data);
        setLoadingUsers(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch users.');
        setLoadingUsers(false);
      });
  }, []);

  const fetchTransactions = useCallback(() => {
    setLoadingTransactions(true);
    axios.get('http://localhost:5000/transactions')
      .then((res) => {
        setTransactions(res.data);
        setLoadingTransactions(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch transactions.');
        setLoadingTransactions(false);
      });
  }, []);

  useEffect(() => {
    fetchBooks();

    if (action === 'borrow') {
      fetchUsers();
    } else {
      fetchTransactions();
      setUsers([]);
    }

    // Reset transaction state when action changes
    setTransaction({ book_id: '', user_id: '', transaction_id: '' });
  }, [action, fetchBooks, fetchUsers, fetchTransactions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));

    if (name === 'transaction_id') {
      const selectedTransaction = transactions.find((t) => t._id === value);
      if (selectedTransaction) {
        setTransaction((prevTransaction) => ({
          ...prevTransaction,
          book_id: selectedTransaction.book_id._id,
          user_id: selectedTransaction.user_id._id,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = action === 'borrow' ? 'borrow' : 'return';

    if (!transaction.book_id || (action === 'borrow' && !transaction.user_id)) {
      alert('Please select all required fields.');
      return;
    }

    // Only send necessary data based on the action
    const data =
      action === 'borrow'
        ? transaction // Send both book_id and user_id when borrowing
        : { book_id: transaction.book_id, user_id: transaction.user_id }; // Send both book_id and user_id when returning

    axios
      .post(`https://library-backend-9f7k.onrender.com/transactions/${endpoint}`, data)
      .then((res) => {
        setModalMessage(res.data.message);
        setShowModal(true);
        setTransaction({ book_id: '', user_id: '', transaction_id: '' });
        // Refresh the books and transactions list
        fetchBooks();
        fetchTransactions();
      })
      .catch((err) => {
        setModalMessage(err.response?.data?.message || "Error");
        setShowModal(true);
        console.error(err);
      });
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container maxWidth="sm" className="page-container">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom className="page-title">
          {action === 'borrow' ? 'Borrow Book' : 'Return Book'}
        </Typography>
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}

        {(loadingBooks || (action === 'borrow' && loadingUsers) || (action === 'return' && loadingTransactions)) ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : books.length === 0 ? (
          <Box mt={2}>
            <Typography variant="body1">
              {action === 'borrow'
                ? 'No books are currently available for borrowing.'
                : 'No books are currently borrowed.'}
            </Typography>
            <Button
              onClick={() => setAction(action === 'borrow' ? 'return' : 'borrow')}
              variant="outlined"
              color="secondary"
              className="switch-button"
            >
              Switch to {action === 'borrow' ? 'Return' : 'Borrow'} Book
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit} className="form-container">
            {action === 'return' && (
              <FormControl fullWidth required margin="normal" className="form-group">
                <InputLabel className="form-label">Transaction</InputLabel>
                <Select
                  name="transaction_id"
                  value={transaction.transaction_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <MenuItem value="">
                    <em>Select a transaction</em>
                  </MenuItem>
                  {transactions.map((t) => (
                    <MenuItem key={t._id} value={t._id}>
                      {t.book_id.title} borrowed by {t.user_id.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select the transaction to return the book.</FormHelperText>
              </FormControl>
            )}

            <FormControl fullWidth required margin="normal" className="form-group">
              <InputLabel className="form-label">Book</InputLabel>
              <Select
                name="book_id"
                value={transaction.book_id}
                onChange={handleChange}
                disabled={action === 'return'}
                className="form-control"
              >
                <MenuItem value="">
                  <em>Select a book</em>
                </MenuItem>
                {books.map((book) => (
                  <MenuItem key={book._id} value={book._id}>
                    {book.title} ({book.availability_status})
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select the book to {action}.</FormHelperText>
            </FormControl>

            {action === 'borrow' && (
              <FormControl fullWidth required margin="normal" className="form-group">
                <InputLabel className="form-label">User</InputLabel>
                <Select
                  name="user_id"
                  value={transaction.user_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <MenuItem value="">
                    <em>Select a user</em>
                  </MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select the user borrowing the book.</FormHelperText>
              </FormControl>
            )}

            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" className="submit-button">
                {action === 'borrow' ? 'Borrow' : 'Return'} Book
              </Button>
              <Button
                onClick={() => {
                  setAction(action === 'borrow' ? 'return' : 'borrow');
                  setTransaction({ book_id: '', user_id: '', transaction_id: '' });
                }}
                variant="outlined"
                color="secondary"
                className="switch-button"
              >
                Switch to {action === 'borrow' ? 'Return' : 'Borrow'} Book
              </Button>
            </Box>
          </form>
        )}
      </Box>
      <ModalPopup show={showModal} handleClose={handleClose} title="Notification">
        <p>{modalMessage}</p>
      </ModalPopup>
    </Container>
  );
}

export default BorrowBook;