import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddBook from './components/AddBook';
import AddUser from './components/AddUser';
import BooksList from './components/BooksList';
import BorrowBook from './components/BorrowBook';
import Dashboard from './components/Dashboard';
import AuthContext, { AuthProvider } from './context/AuthContext';
import './App.css'; // Import the CSS file

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-background">
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: "medium" }}> {isAuthenticated ? "Library Dashboard" : "Library Management Portal"}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/add-book">Add Book</Nav.Link>
                  <Nav.Link as={Link} to="/add-user">Add User</Nav.Link>
                  <Nav.Link as={Link} to="/books-list">Books List</Nav.Link>
                  <Nav.Link as={Link} to="/borrow-book">Borrow / Return Book</Nav.Link>
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isAuthenticated && (
            <>
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/books-list" element={<BooksList />} />
              <Route path="/borrow-book" element={<BorrowBook />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}
        </Routes>
      </Container>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}
