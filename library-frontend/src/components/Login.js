import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ModalPopup from './ModalPopup'; // Import the ModalPopup component
import './Auth.css'; // Import the CSS file
import Img from '../image/img.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/login', { email, password });
      login(response.data.token);
      setModalMessage('Login successful');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/dashboard'); // Redirect to dashboard
      }, 2000);
    } catch (err) {
      setModalMessage(err.response?.data?.message || 'Error logging in.');
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <section className="vh-100 login-page">
      <Container className="py-5 h-100">
        <Row className="d-flex align-items-center justify-content-center h-100">
          <Col md={8} lg={7} xl={6}>
            <img
              src={Img}
              className="img-fluid"
              alt="Phone image"
            />
          </Col>
          <Col md={7} lg={5} xl={5} className="offset-xl-1">
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group className="form-outline mb-4">
                <Form.Control
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Label className="form-label" htmlFor="form1Example13">
                  Email address
                </Form.Label>
              </Form.Group>

              <Form.Group className="form-outline mb-4">
                <Form.Control
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Label className="form-label" htmlFor="form1Example23">
                  Password
                </Form.Label>
              </Form.Group>

              <Button type="submit" className="btn btn-primary btn-lg btn-block">
                Sign in
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ModalPopup show={showModal} handleClose={handleClose} title="Notification">
        <p>{modalMessage}</p>
      </ModalPopup>
    </section>
  );
}

export default Login;