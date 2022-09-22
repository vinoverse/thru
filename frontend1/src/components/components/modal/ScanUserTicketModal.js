import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import { QrReader } from 'react-qr-reader';
import { useSelector } from 'react-redux';

const MyVerticallyCenteredModal = (props) => {
    const {scandata} = props;

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
            <h3>Scanned Result : {scandata}</h3>
        </Modal.Body>
      </Modal>
    );
}

const ScanUserTicketModal = (props) => {
    const [data, setData] = useState('');
    const [scandata, setScandata] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const {account} = useSelector((store) => store);

    const {event} = props;

    const checkValidation = async (result) => {
        if (result !== "") {
            const url = "/api/user/event/participate?" + result;
            
            const response = await fetch(url,{headers: {
                'walletaddress': account,
                'eventid': event.id
            }});

            if (response.status === 403) {
                window.location.href="/";
            } else if (!response.ok) {
                alert("에러 신고 부탁 드립니다.");
            } else {
                const res = await response.json();
                setScandata(res["result"]);
                setModalShow(true);
                setTimeout(() => {
                    setModalShow(false);
                    setData("");
                }, 2000);
            }
        }   
    }

    useEffect(() => {
        checkValidation(data)
    }, [data]);
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
        >
        <Modal.Title className="event-title">{event.title}</Modal.Title>
        <Modal.Body>
            <QrReader
                constraints={{facingMode:'user'}}
                scanDelay={500}
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result.text);
                    }
          
                    if (!!error) {
                        console.info(error);
                    }
                }}
            />
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} scandata={scandata}/>
        </Modal.Body>
      </Modal>
    );
};

export default ScanUserTicketModal;