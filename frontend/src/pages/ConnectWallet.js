import React, { useEffect } from 'react';

import { useWeb3React } from '@web3-react/core'
import { Button, Figure } from 'react-bootstrap';

import coninbaseImg from '../asserts/coinbase.png'; 
import metamaskImg from '../asserts/metamask.png';
import { useNavigate } from 'react-router-dom';
import { connectors } from '../component/Connector';

const ConnectWallet = () => {
    const { account, activate, deactivate} = useWeb3React();

    /*
    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
      }, []);
    */

    let navigate = useNavigate();

    useEffect(() => {
        console.log(!!account);
        if (!!account) {
            navigate("/nftList");
        }
    }, [account]);

    return (
        <div>
            {account}
            <Figure onClick={() => {activate(connectors.injected);}}><Figure.Image width={160} src={metamaskImg}/></Figure>
            <Figure onClick={() => {activate(connectors.coinbaseWallet)}}><Figure.Image width={160} src={coninbaseImg}/></Figure>

            <Button variant="dark" onClick={deactivate}>Disconnect</Button>
        </div>
    );
};

export default ConnectWallet;