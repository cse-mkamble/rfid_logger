import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

const ErrorModal = ({ error }) => {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>

            <Modal.Body>{error}</Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>close</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default ErrorModal;