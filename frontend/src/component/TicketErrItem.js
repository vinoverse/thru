import React from 'react';
import { ListGroup } from 'react-bootstrap';

const TicketErrItem = (props) => {
    const {sendError} = props;

    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">Event Id : {sendError.eventId}</div>
                User Email : {sendError.email}  |  Error Type : {sendError.type}
            </div>
        </ListGroup.Item>
    );
};

export default TicketErrItem;