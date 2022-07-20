import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Row, Button } from 'react-bootstrap';
import NFTItem from '../component/NFTItem';
import { Navigate } from 'react-router-dom';
import { SpinnerModal } from '../component/SpinnerModal';


const NFTList = (props) => {
    const { account, deactivate } = useWeb3React();
    const [nfts, setNfts] = useState([]);
    const {apiDomain} = props;

    const [spinner, setSpinner] = useState(false);

    useEffect(() => {   
        setSpinner(true);
        fetch(apiDomain + "/api/user/nfts/" + account).then((res) => res.json()).then((res) => {
          setNfts(res["result"]);
          setSpinner(false);
        });
    }, [apiDomain]);

    return (
        <>
            {account
            ?<div>
              <Button variant="dark" onClick={deactivate}>Disconnect</Button>
              <SpinnerModal show={spinner} onHide={() => setSpinner(false)} />
              <Row xs={1} md={2} className="g-4">
                {nfts.map((nft) => ( 
                    <NFTItem key={nft.name} nft={nft}/>
                ))}
              </Row>
            </div>
            :<Navigate to="/"/>
            }
        </>
    );
};

export default NFTList;