// HistorySection.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HistorySection.css'; // Create this CSS file for styling
import img from '../image/cimg1.png';

function HistorySection() {
  return (
    <section className="history-section">
      <Container>
        <Row className="align-items-center">
          {/* Image Column */}
          <Col lg={6} md={12}>
            <img
              src={img} // Update the path to your image
              alt="History of the Library"
              className="img-fluid rounded"
            />
          </Col>
          {/* Text Column */}
          <Col lg={6} md={12}>
            <h2>Our Library's History</h2>
            <p>
              Established in 1920, our library has been a cornerstone of community education and
              culture. With over a century of service, we've grown from a small collection of books
              to a vast repository of knowledge, embracing new technologies and expanding services
              along the way.
            </p>
            <p>
              Our mission has always been to provide accessible resources for learning and personal
              growth. We host various programs, workshops, and events that cater to all age groups,
              fostering a love for reading and continuous learning.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HistorySection;