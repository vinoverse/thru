import React, { useEffect } from 'react';

import { useWeb3React } from '@web3-react/core'
import { Figure } from 'react-bootstrap';

import coninbaseImg from '../asserts/coinbase.png'; 
import metamaskImg from '../asserts/metamask.png';
import wallectconnectImg from '../asserts/walletconnect.png';

import { useNavigate } from 'react-router-dom';
import { connectors } from '../component/Connector';

const ConnectWallet = () => {
    const { account, activate } = useWeb3React();

    let navigate = useNavigate();

    useEffect(() => {
        if (!!account) {
            navigate("/nftList");
        }
    }, [account]);

    return (
        <div>
            <Figure onClick={() => {activate(connectors.injected);}}><Figure.Image width={160} src={metamaskImg}/></Figure>
            <Figure onClick={() => {activate(connectors.coinbaseWallet)}}><Figure.Image width={160} src={coninbaseImg}/></Figure>
            <Figure onClick={() => {activate(connectors.walletConnect)}}><Figure.Image width={160} src={wallectconnectImg}/></Figure>
        </div>
    );
};

export default ConnectWallet;