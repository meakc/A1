import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Banner() {
  return (
    <div className="bg-primary text-white text-center py-5">
      <Container>
        <Row>
          <Col>
            <h1>Welcome to the Library Management Portal</h1>
            <p>Manage your library efficiently with our system.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Banner;