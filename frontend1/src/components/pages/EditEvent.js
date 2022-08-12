import React from "react";
import { Modal } from 'react-bootstrap';

const EditEvent = (props) => {
    return (
        <Modal {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Title className="event-title">Events</Modal.Title>
            <Modal.Body>
                <span>aa</span>
            </Modal.Body>
        </Modal>
    );
};

export default EditEvent;
