import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import ModalPopup from './ModalPopup'; // Import the ModalPopup component
import './CommonStyles.css'; // Import common styles

function AddUser() {
  const [user, setUser] = useState({
    name: '',
    contact_info: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', user)
      .then((res) => {
        setModalMessage('User added successfully');
        setShowModal(true);
        setUser({ name: '', contact_info: '' });
      })
      .catch((err) => {
        setModalMessage('Failed to add user');
        setShowModal(true);
        console.error(err);
      });
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container maxWidth="sm" className="page-container">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom className="page-title">Add New User</Typography>
        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-control"
          />
          <TextField
            label="Contact Info"
            name="contact_info"
            value={user.contact_info}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-control"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" className="submit-button">Add User</Button>
          </Box>
        </form>
      </Box>
      <ModalPopup show={showModal} handleClose={handleClose} title="Notification">
        <p>{modalMessage}</p>
      </ModalPopup>
    </Container>
  );
}

export default AddUser;