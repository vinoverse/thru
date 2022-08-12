import React, {useState} from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from '@reach/router';

export const UserEventMenuModal = (props) => {
    const {event, setMenuModalShow, setUpdateModalShow} = props;
    const {account} = useSelector((store) => store);
    const [status, setStatus] = useState(0);

    const modifyEvent = () => {
        setMenuModalShow(false);
        setUpdateModalShow(true);
    }

    const deleteEvent = async () => {
        const data = {
            id : event.id
        }

        const response = await fetch("/api/user/event/", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'WalletAddress': account,
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
                alert("이벤트가 삭제되었습니다.");
                setStatus(1);
            } else {
                alert("이벤트 삭제에 실패했습니다.");
            }
        }
    }

    return (
        <>
        {status === 0
        ? 
        <Modal {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
        >
            <Modal.Title className="event-title">{event.title}</Modal.Title>
            <Modal.Body>
                <ListGroup as="ol">
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">참석 체크</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" onClick={modifyEvent}>
                            <div className="fw-bold">이벤트 수정</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" onClick={deleteEvent}>
                            <div className="fw-bold">이벤트 삭제</div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
        </Modal>
        : <Redirect noThrow={true} to="/myevents"/>
        }
        </>
    );
};