import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Row } from 'react-bootstrap';
import NFTItem from '../component/NFTItem';

const NFTList = () => {
    const { account } = useWeb3React();
    const [nfts, setNfts] = useState([]);

    useEffect(() => {   
        fetch("http://localhost:8080/api/user/nfts/" + account).then((res) => res.json()).then((res) => {
          setNfts(res["result"]);
        });
    }, []);

    return (
        <>
            <div>
              <Row xs={1} md={2} className="g-4">
                {nfts.map((nft) => ( 
                    <NFTItem key={nft.name} nft={nft}/>
                ))}
              </Row>
            </div>
        </>
    );
};

export default NFTList;