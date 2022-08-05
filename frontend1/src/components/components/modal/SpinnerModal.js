import React from 'react';
import { Modal } from 'react-bootstrap';

export const SpinnerModal = (props) => {
    return (
        <Modal {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
        >
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                </div>
            </Modal.Body>
        </Modal>
    );
};