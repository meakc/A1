import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Pagination, Form } from 'react-bootstrap';
import './CommonStyles.css';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const booksPerPage = 30;

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create pagination items
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBooks.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container className="page-container">
      <h2 className="page-title">Books List</h2>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </Form>
      <div className="table-container">
        <Table striped bordered hover responsive className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.slice(indexOfFirstBook, indexOfLastBook).map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publication_year}</td>
                <td>{book.availability_status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="pagination">
          {pageNumbers.map(number => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)} className="pagination-item">
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Container>
  );
}

export default BooksList;