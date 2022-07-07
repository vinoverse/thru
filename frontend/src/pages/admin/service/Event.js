import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';

const Event = () => {
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

    const saveEvent = () => {
        const data = {
            "title": eventName,
            "contractAddress": contractAddress
        }

        const url = "http://localhost:8080/api/admin/event";
        const thruToken = window.localStorage.getItem("thruUser");

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': thruToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((data) => {
            if (data["result"] === "success") {
                alert("이벤트가 등록되었습니다.");
                window.location.reload();
            } else {
                alert("이벤트 등록에 실패했습니다.");
            }
            
        });
    }


    return (
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
    );
};

export default Event;