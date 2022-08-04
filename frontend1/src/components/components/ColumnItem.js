import React, {useState} from 'react';
import QRCode from 'qrcode'
import { Modal } from 'react-bootstrap';

const MyVerticallyCenteredModal = (props) => {
    const {qrurl, imgurl, modalShow, setModalShow} = props;

    return (
        <div className={"md-modal md-effect-1 " + (modalShow ? "md-show" : '')} onClick={() => {setModalShow(false);}}>
            <div className="modal-content md-content" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div>
                        <span class="TICKET">TICKET</span>
                        <img src={qrurl} className="Rectangle-3" /> 
                    </div>
                    <img src="./img/ticket/dotline.png" className="Rectangle-3" /> 
                    <div>
                        <div class="Line-2">
                            <span className="NFT">NFT</span>
                            <img src={imgurl} className="Rectangle-4"/> 
                        </div>
                        <div class="Line-3">
                            <div className="ticketInfo">
                                <span className="DATE">DATE</span><br />
                                <span className="type">Sept 18th, 2022</span>
                            </div>
                            <div className="ticketInfo">
                                <span className="DATE">VALID FOR</span>
                                <img src="./img/ticket/people.png" className="download" /><br />
                                <span className="type">1 person</span>
                            </div>
                            <div>
                                <span class="DATE">SEAT</span><br />
                                <span className="type">VIP SEAT</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </div>
    );
}

const ColumnItem = (props) => {
    const { contract, tokenId, ownerAddress, originUrl, name, description } = props.nft;
    const { onImgLoad, state } = props;
    const [modalShow, setModalShow] = React.useState(false);
    const [ qrUrl, setQrUrl ] = useState('');

    const generateQrCode = async () => {
      try {
        if (modalShow) {
            setModalShow(false);
        } else {
            const respone = await QRCode.toDataURL("conAdr=" + contract + "&tokenId=" + tokenId);
            setQrUrl(respone);
            setModalShow(true);
        }
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
            <MyVerticallyCenteredModal modalShow={modalShow} setModalShow={setModalShow} qrurl={qrUrl} imgurl={originUrl}/>
        </>
    );
};

export default ColumnItem;