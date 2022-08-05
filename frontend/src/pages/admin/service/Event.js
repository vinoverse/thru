import React, {useState, useEffect} from 'react';
import { Form, Button, ListGroup, Placeholder } from 'react-bootstrap';
import EventItem from '../../../component/EventItem';

const Event = (props) => {
    const [updateInputs, setUpdateInputs] = useState({
        eventName: "",
        contractAddress: "",
    });

    const { eventName, contractAddress, infoTitle1, infoTitle2, infoTitle3, infoValue1, infoValue2, infoValue3 } = updateInputs;
    
    const onChange = (e) => {
        const { value, name } = e.target;
        setUpdateInputs({
          ...updateInputs,
          [name]: value
        });
    };

    const saveEvent = async () => {
        if (!eventName || !contractAddress) {
            alert("이벤트 정보를 입력해주세요.");
            return;
        }

        const data = {
            "title": eventName,
            "contractAddress": contractAddress,
            "info": JSON.stringify({
                "infoTitle1": infoTitle1,
                "infoTitle2": infoTitle2,
                "infoTitle3": infoTitle3,
                "infoValue1": infoValue1,
                "infoValue2": infoValue2,
                "infoValue3": infoValue3,
            })
        }

        const url = "/api/admin/event";
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
            window.location.href="/";
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
        const url = "/api/admin/event";
        const thruToken = window.localStorage.getItem("thruUser");

        const response = await fetch(url, {
            headers: {
                'Authorization': thruToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 403) {
            window.location.href="/";
        } else if (!response.ok) {
            alert("에러 신고 부탁 드립니다.");
        } else {
            const data = await response.json();
            setEvents(data);
        }
    }

    useEffect(() => {
        getEvent();
    }, []);


    return (
        <>
        <Placeholder xs={12} size="xs" />
        <ListGroup as="ol">
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

            <Form.Group className="mb-3" controlId="formBasicContractName">
                <Form.Label>Info 1</Form.Label>
                <Form.Control type="input" placeholder="제목" name="infoTitle1" onChange={onChange} value={infoTitle1}/>
                <Form.Control type="input" placeholder="값" name="infoValue1" onChange={onChange} value={infoValue1}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContractName">
                <Form.Label>Info 2</Form.Label>
                <Form.Control type="input" placeholder="제목" name="infoTitle2" onChange={onChange} value={infoTitle2}/>
                <Form.Control type="input" placeholder="값" name="infoValue2" onChange={onChange} value={infoValue2}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContractName">
                <Form.Label>Info 3</Form.Label>
                <Form.Control type="input" placeholder="제목" name="infoTitle3" onChange={onChange} value={infoTitle3}/>
                <Form.Control type="input" placeholder="값" name="infoValue3" onChange={onChange} value={infoValue3}/>
            </Form.Group>
            
            <Button variant="primary" onClick={saveEvent}>
                등록
            </Button>
        </Form>
        </>
    );
};

export default Event;