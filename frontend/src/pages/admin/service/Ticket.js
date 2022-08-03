import React, {useState, useEffect} from 'react';
import { Form, Button, Placeholder, ListGroup } from 'react-bootstrap';
import axios from 'axios'
import TicketErrItem from '../../../component/TicketErrItem';

const Ticket = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const sendTicket = async () => {
        if (!selectedFile) {
            alert("파일을 선택 해주세요.");
            return;
        }

        const url = "/api/admin/sendTicket";
        const thruToken = window.localStorage.getItem("thruUser");
        
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': thruToken
            }
        })

        if (response.status === 403) {
            window.location.href="/";
        } else if (response.status !== 200) {
            alert("에러 신고 부탁 드립니다.");
        } else {
            const data = await response.data;
            const successCount = data["successCount"];
            const errorCount = data["errorCount"];

            if (errorCount === -1) {
                alert("엑셀 파일에 오류가 있습니다. 확인 부탁 드립니다.");
            } else if (errorCount === 0) {
                alert("해당 이메일로 티켓을 발송하였습니다.\n전송한 티켓 개수 : " + successCount);
            } else {
                alert("티켓 전송에 실패한 사용자가 있습니다. 확인해주세요.\n전송한 티켓 개수 : " + successCount + "\n에러 항목 : " + errorCount);
            }
            window.location.reload();
        }
    }

    const [ticketSendErrs, setTicketSendErrs] = useState([]);

    const getTicketSendErr = async () => {
        const url = "/api/admin/ticketSendError";
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
            setTicketSendErrs(data);
        }
    }

    useEffect(() => {
        getTicketSendErr();
    }, []);

    return (
        <div>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>참석자 목록을 업로드해주세요.</Form.Label>
                <Form.Control type="file" accept=".xlsx,.xls" onChange={handleFileSelect}/>
            </Form.Group>
            <Button variant="primary" onClick={sendTicket}>
                Ticket 발송
            </Button>
            <Placeholder xs={12} size="xs" />
            <ListGroup as="ol">
            {ticketSendErrs.map((sendError) => (
                <TicketErrItem key={sendError.email} sendError={sendError} />
            ))}
            </ListGroup>
            <Placeholder xs={12} size="xs" />
        </div>
    );
};

export default Ticket;