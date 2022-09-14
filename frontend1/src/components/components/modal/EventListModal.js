import React from 'react';
import { ListGroup, Modal } from 'react-bootstrap';

export const EventListModal = (props) => {
    const {eventlist, setlistmodalshow, setticketmodalshow, generateqrcode, contractinfo} = props;

    const selectEvent = (index) => {
        generateqrcode(eventlist[index], contractinfo.contract, contractinfo.tokenId, contractinfo.originUrl);
        setlistmodalshow(false);
        setticketmodalshow(true);
    }

    return (
        <Modal {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
        >
            <Modal.Title className="event-title">Events</Modal.Title>
            <Modal.Body>
                <ListGroup as="ol">
                {eventlist.map((event, index) => (
                    <ListGroup.Item
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        onClick={() => selectEvent(index)}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{event.title}</div>
                        </div>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};