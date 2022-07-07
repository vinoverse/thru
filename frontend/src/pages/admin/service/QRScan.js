import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { Modal } from 'react-bootstrap';

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

const QRScan = () => {
    const [data, setData] = useState('');
    const [scandata, setScandata] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const checkValidation = (result) => {
        if (result !== "") {
            const url = "http://localhost:8080/api/admin/participate?" + result;
            const thruToken = window.localStorage.getItem("thruUser")
            
            fetch(url,{headers: {
                'Authorization': thruToken,
            },}).then((res) => res.json()).then((res) => {
                setScandata(res["result"]);
                setModalShow(true);
                setTimeout(() => {
                    setModalShow(false);
                    setData("");
                }, 2000);
            });
        }   
    }

    useEffect(() => {
        checkValidation(data)
    }, [data]);

    return (
        <>
            <QrReader
                constraints={{facingMode:'environment'}}
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
        </>
    );
};

export default QRScan;