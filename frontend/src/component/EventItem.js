import React from 'react';
import { Badge, ListGroup } from 'react-bootstrap';

const EventItem = (props) => {
    const {event} = props;

    //<Badge bg="primary" pill>14</Badge>

    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{event.title}</div>
                {event.contractAddress}
            </div>
        </ListGroup.Item>
    );
};

export default EventItem;