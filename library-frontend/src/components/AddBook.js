import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import ModalPopup from './ModalPopup'; // Import the ModalPopup component
import './CommonStyles.css'; // Import common styles

function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publication_year: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/books', book)
      .then((res) => {
        setModalMessage('Book added successfully');
        setShowModal(true);
        setBook({ title: '', author: '', publication_year: '' });
      })
      .catch((err) => {
        setModalMessage('Failed to add book');
        setShowModal(true);
        console.error(err);
      });
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container maxWidth="sm" className="page-container">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom className="page-title">Add New Book</Typography>
        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-control"
          />
          <TextField
            label="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-control"
          />
          <TextField
            label="Publication Year"
            name="publication_year"
            type="number"
            value={book.publication_year}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-control"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" className="submit-button">Add Book</Button>
          </Box>
        </form>
      </Box>
      <ModalPopup show={showModal} handleClose={handleClose} title="Notification">
        <p>{modalMessage}</p>
      </ModalPopup>
    </Container>
  );
}

export default AddBook;