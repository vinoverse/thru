import React, {useState} from 'react';
import QRCode from 'qrcode'
import { Modal } from 'react-bootstrap';

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
            <img src={imgurl} className="qr_img"/> 
            <img src={qrurl} className="qr_img" /> 
        </Modal.Body>
        <Modal.Footer>
            <div className='col-lg-12'>
                <div className="spacer-single"></div>
                <span onClick={props.onHide} className="btn-main lead m-auto">Close</span>
            </div>
        </Modal.Footer>
      </Modal>
    );
}

const ColumnItem = (props) => {
    const { contract, tokenId, ownerAddress, originUrl, name, description } = props.nft;
    const { onImgLoad, state } = props;
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
            <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4" onClick={generateQrCode}>
                <div className="nft__item m-0">
                    <div className="nft__item_wrap" style={{height: `${state.height}px`}}>
                        <span>
                            <img onLoad={onImgLoad} src={originUrl} className="lazy nft__item_preview" alt=""/>
                        </span>
                    </div>
                    <div className="nft__item_info">
                        <span>
                            <h4>{name}</h4>
                        </span>
                    </div> 
                </div>
            </div>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} qrurl={qrUrl} imgurl={originUrl}/>
        </>
    );
};

export default ColumnItem;