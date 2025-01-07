import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalPopup.css'; // Import modal-specific styles

function ModalPopup({ show, handleClose, title, children }) {
  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPopup;