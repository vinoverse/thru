import React from "react";
import { Modal } from 'react-bootstrap';

export const TicketModal = (props) => {
    const {qrurl, imgurl, modalShow, setTicketModalShow, ticketEvent} = props;

    let info = null;
    if (ticketEvent.info) {
        info = JSON.parse(ticketEvent.info);
    }

    return (
        <div className={"md-modal md-effect-1 " + (modalShow ? "md-show" : '')} onClick={() => {setTicketModalShow(false);}}>
            <div className="modal-content md-content">
                <Modal.Body>
                    <div>
                        <span className="TICKET">TICKET</span>
                        <img src={qrurl} className="Rectangle-3" /> 
                    </div>
                    <img src="./img/ticket/dotline.png" className="Rectangle-3" /> 
                    <div>
                        <div className="Line-2">
                            <span className="NFT">NFT</span>
                            {imgurl.search("mp4") > -1
                            ? <video src={imgurl} className="Rectangle-4" autoplay="true"/>
                            : <img src={imgurl} className="Rectangle-4"/> 
                            }
                        </div>
                        {info 
                        ?
                        <div className="Line-3">
                            <div className="ticketInfo">
                                <span className="DATE">{info["infoTitle1"]}</span><br />
                                <span className="type">{info["infoValue1"]}</span>
                            </div>
                            <div className="ticketInfo">
                                <span className="DATE">{info["infoTitle2"]}</span><br />
                                <span className="type">{info["infoValue2"]}</span>
                            </div>
                            <div>
                                <span className="DATE">{info["infoTitle3"]}</span><br />
                                <span className="type">{info["infoValue3"]}</span>
                            </div>
                        </div>
                        :<div className="Line-3"></div>
                        }
                        
                    </div>
                </Modal.Body>
            </div>
        </div>
    );
}