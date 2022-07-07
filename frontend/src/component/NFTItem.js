import React, {useState} from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import QRCode from 'qrcode'

const MyVerticallyCenteredModal = (props) => {
    const {qrurl, imgurl} = props;

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
            <img src={imgurl} className="qr_img" /> 
            <img src={qrurl} className="qr_img" /> 
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

const NFTItem = (props) => {
    const { contract, tokenId, ownerAddress, originUrl, name, description } = props.nft;
    const [modalShow, setModalShow] = React.useState(false);
    const [ qrUrl, setQrUrl ] = useState('');

    const generateQrCode = async () => {
      try {
        const respone = await QRCode.toDataURL("conAdr=" + contract + "&tokenId=" + tokenId);
        setQrUrl(respone);
        setModalShow(true);
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <>
            <Card>
                <Card.Img variant="top" src={originUrl} onClick={generateQrCode}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
            </Card>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} qrurl={qrUrl} imgurl={originUrl}/>
        </>
    );
};

export default NFTItem;