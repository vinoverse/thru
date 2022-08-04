import React, {useState} from 'react';
import QRCode from 'qrcode'
import { Modal } from 'react-bootstrap';


const ColumnItem = (props) => {
    const { contract, tokenId, originUrl, name } = props.nft;
    const { onImgLoad, state, setModalShow, modalShow, setQrUrl, setOriginUrl } = props;
    

    const generateQrCode = async () => {
      try {
        if (modalShow) {
            setModalShow(false);
        } else {
            const respone = await QRCode.toDataURL("conAdr=" + contract + "&tokenId=" + tokenId);
            setOriginUrl(originUrl);
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
        </>
    );
};

export default ColumnItem;