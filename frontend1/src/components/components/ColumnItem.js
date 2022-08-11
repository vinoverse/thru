import React from 'react';


const ColumnItem = (props) => {
    const { contract, tokenId, originUrl, name } = props.nft;
    const { onImgLoad, state, setQrModalShow, modalShow, eventList, setEventList, setListModalShow, generateQrCode, setContractInfo } = props;

    const showModal = async () => {
        if (modalShow) {
            setQrModalShow(false);
        } else {
            if (eventList) {
                if (eventList.length === 1) {
                    generateQrCode(eventList[0], contract, tokenId, originUrl)
                } else {
                    setEventList(eventList);
                    setContractInfo({contract: contract, tokenId: tokenId, originUrl: originUrl})
                    setListModalShow(true);
                }
            }   
        }
    }

    return (
        <>
            <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4" onClick={showModal}>
                <div className="nft__item m-0">
                    <div className="nft__item_wrap" style={{height: `${state.height}px`}}>
                        <span>
                            {originUrl.search("mp4") > -1
                            ? <video onLoad={onImgLoad} src={originUrl} className="lazy nft__item_preview" alt="" width="100%"/>
                            : <img onLoad={onImgLoad} src={originUrl} className="lazy nft__item_preview" alt=""/>
                            }
                            
                        </span>
                    </div>
                    <div className="nft__item_info">
                        <span>
                            <h4>{name}</h4>
                        </span>
                        {eventList 
                        ? <div className="nft__item_like">
                            <i className="fa fa-ticket"></i><span>{eventList.length}</span>
                        </div>
                        :<div></div>
                        }
                    </div> 
                </div>
            </div>
        </>
    );
};

export default ColumnItem;