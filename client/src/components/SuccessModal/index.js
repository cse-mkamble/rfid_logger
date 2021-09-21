import React from 'react';
import { Button, Modal } from "react-bootstrap";

const SuccessModal = ({ success }) => {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>

            <Modal.Body>{success}</Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>close</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default SuccessModal;