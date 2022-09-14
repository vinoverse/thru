import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ColumnItem from './ColumnItem';
import { SpinnerModal } from "./modal/SpinnerModal";
import { TicketModal } from "./modal/TicketModal";
import { EventListModal } from './modal/EventListModal';
import QRCode from 'qrcode'


const ColumnNew = () => {
    const {account} = useSelector((store) => store);
    const [nftList, setNftList] = useState([]);
    const [eventMap, setEventMap] = useState({});
    const [eventList, setEventList] = useState([]);
    const [ticketEvent, setTicketEvent] = useState({});
    const [state, setState] = useState({
        nfts: [],
        height: 0
    });
    const [contractInfo, setContractInfo] = useState({
        contract: '',
        tokenId: '',
        originUrl: '',
    })
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setModalShow(true);
        fetch("/api/user/nfts/" + account).then((res) => res.json()).then((res) => {
            setModalShow(false);
            setNftList(res["nftList"]);
            setEventMap(res["eventMap"]);
        }).catch((error) => {
            setModalShow(false);
            setNftList([]);
            setEventMap({});
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
    const [ listModalShow, setListModalShow ] = useState(false);

    const closeModal = () => {
        if (qrModalShow) {
            setQrModalShow(false);
            setListModalShow(false);
            setQrUrl('');
            setOriginUrl('');
        }
    }

    const generateQrCode = async (eventItem, contract, tokenId, originUrl) => {
        try {
            let data = "eventId=" + eventItem.id + "&conAdr=" + contract + "&tokenId=" + tokenId;

            if ("walletAddress" in eventItem) {
                data += "&walletAddress=" + eventItem.walletAddress;
            }

            const respone = await QRCode.toDataURL(data);
            setQrUrl(respone);
            setOriginUrl(originUrl);
            setTicketEvent(eventItem);
            setQrModalShow(true);
        } catch (error) {
          console.log(error);
        }
      }
  
    
    return (
        <>
        <div className='row'>
            <SpinnerModal show={modalShow} onHide={() => setModalShow(false)} />
            {state.nfts.map((nft, index) => (
                <ColumnItem key={index} nft={nft} onImgLoad={onImgLoad} state={state} 
                    setQrModalShow={setQrModalShow} modalShow={qrModalShow} 
                    eventList={eventMap[nft.contract]} setEventList={setEventList} setListModalShow={setListModalShow}
                    generateQrCode={generateQrCode} setContractInfo={setContractInfo}
                />
            ))}
            { !!nftList && state.nfts.length !== nftList.length &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={() => loadMore()} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>
        <EventListModal show={listModalShow} onHide={() => setListModalShow(false)} eventlist={eventList} setlistmodalshow={setListModalShow} setticketmodalshow={setQrModalShow} generateqrcode={generateQrCode} contractinfo={contractInfo}/>
        <TicketModal modalShow={qrModalShow} setTicketModalShow={setQrModalShow} qrurl={qrUrl} imgurl={originUrl} ticketEvent={ticketEvent}/>
        {qrModalShow || listModalShow
        ? <div className="fade modal-backdrop show" onClick={closeModal}></div>
        : ''
        }
        
        </>
    );
};

export default ColumnNew;