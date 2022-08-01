import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ColumnItem from './ColumnItem';
import { SpinnerModal } from "./SpinnerModal";

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
    
    return (
        <div className='row'>
            <SpinnerModal show={modalShow} onHide={() => setModalShow(false)} />
            {state.nfts.map((nft, index) => ( 
                <ColumnItem key={index} nft={nft} onImgLoad={onImgLoad} state={state}/>
            ))}
            { !!nftList && state.nfts.length !== nftList.length &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={() => loadMore()} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>
    );
};

export default ColumnNew;