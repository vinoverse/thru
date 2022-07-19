import React, {useState, useEffect} from 'react';
import { Form, Button, ListGroup, Placeholder } from 'react-bootstrap';
import EventItem from '../../../component/EventItem';

const Event = (props) => {
    const { apiDomain } = props;

    const [updateInputs, setUpdateInputs] = useState({
        eventName: "",
        contractAddress: "",
    });

    const { eventName, contractAddress } = updateInputs;
    
    const onChange = (e) => {
        const { value, name } = e.target;
        setUpdateInputs({
          ...updateInputs,
          [name]: value
        });
    };

    const saveEvent = async () => {
        const data = {
            "title": eventName,
            "contractAddress": contractAddress
        }

        const url = apiDomain + "/api/admin/event";
        const thruToken = window.localStorage.getItem("thruUser");

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': thruToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 403) {
            window.location.href="/admin/login";
        } else if (!response.ok) {
            alert("에러 신고 부탁 드립니다.");
        } else {
            const data = await response.json();
            if (data["result"] === "success") {
                alert("이벤트가 등록되었습니다.");
                window.location.reload();
            } else {
                alert("이벤트 등록에 실패했습니다.");
            }
        }
    }

    const [events, setEvents] = useState([]);

    const getEvent = async () => {
        const url = apiDomain + "/api/admin/event";
        const thruToken = window.localStorage.getItem("thruUser");

        const response = await fetch(url, {
            headers: {
                'Authorization': thruToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 403) {
            window.location.href="/admin/login";
        } else if (!response.ok) {
            alert("에러 신고 부탁 드립니다.");
        } else {
            const data = await response.json();
            setEvents(data);
            console.log(events);
        }
    }

    useEffect(() => {
        if (!!apiDomain) {
            getEvent();
        }
    }, [apiDomain]);


    return (
        <>
        <Placeholder xs={12} size="xs" />
        <ListGroup as="ol" numbered>
            {events.map((event) => (
                <EventItem key={event.id} event={event} />
            ))}
        </ListGroup>
        <Placeholder xs={12} size="xs" />
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEventName">
                <Form.Label>Event 이름</Form.Label>
                <Form.Control type="input" placeholder="Event 이름" name="eventName" onChange={onChange} value={eventName}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContractName">
                <Form.Label>Smart Contract 주소</Form.Label>
                <Form.Control type="input" placeholder="Contract 주소" name="contractAddress" onChange={onChange} value={contractAddress}/>
            </Form.Group>
            <Button variant="primary" onClick={saveEvent}>
                등록
            </Button>
        </Form>
        </>
    );
};

export default Event;