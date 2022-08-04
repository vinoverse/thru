import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ColumnItem from './ColumnItem';
import { SpinnerModal } from "./SpinnerModal";
import { QRCode } from 'qrcode';
import { Modal } from 'react-bootstrap';

const MyVerticallyCenteredModal = (props) => {
    const {qrurl, imgurl, modalShow, setModalShow} = props;

    return (
        <div className={"md-modal md-effect-1 " + (modalShow ? "md-show" : '')} onClick={() => {setModalShow(false);}}>
            <div className="modal-content md-content">
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

const ColumnNew = () => {
    const {account} = useSelector((store) => store);
    const [nftList, setNftList] = useState([]);
    const [state, setState] = useState({
        nfts: [],
        height: 0
    });
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setModalShow(true);
        fetch("/api/user/nfts/" + account).then((res) => res.json()).then((res) => {
            setModalShow(false);
            setNftList(res["result"]);
        }).catch((error) => {
            setModalShow(false);
            setNftList([]);
        });
    }, []);

    useEffect(() => {
        if (!!nftList) {
            setState({...state, nfts: [...(nftList.slice(0, 8))]});
        }
    }, [nftList]);


    const loadMore = () => {
        let nftState = state.nfts;
        let start = nftState.length;
        let end = nftState.length+4;
        setState({...state, nfts: [...nftState, ...(nftList.slice(start, end))]})
    }

    
    const onImgLoad = (event) => {
        let img = event.target;
        let currentHeight = state.height;
        if(currentHeight < img.offsetHeight) {
            setState({...state, height: img.offsetHeight})
        }
    }

    const [ qrUrl, setQrUrl ] = useState('');
    const [ originUrl, setOriginUrl ] = useState('');
    const [ qrModalShow, setQrModalShow ] = useState(false);

    const closeModal = () => {
        if (qrModalShow) {
            setQrModalShow(false);
            setQrUrl('');
            setOriginUrl('');
        }
    }
    
    return (
        <>
        <div className='row'>
            <SpinnerModal show={modalShow} onHide={() => setModalShow(false)} />
            {state.nfts.map((nft, index) => ( 
                <ColumnItem key={index} nft={nft} onImgLoad={onImgLoad} state={state} setModalShow={setQrModalShow} modalShow={qrModalShow} setQrUrl={setQrUrl} setOriginUrl={setOriginUrl}/>
            ))}
            { !!nftList && state.nfts.length !== nftList.length &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={() => loadMore()} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>
        <MyVerticallyCenteredModal modalShow={qrModalShow} setModalShow={setQrModalShow} qrurl={qrUrl} imgurl={originUrl}/>
        {qrModalShow 
        ? <div class="fade modal-backdrop show" onClick={closeModal}></div>
        : ''
        }
        
        </>
    );
};

export default ColumnNew;