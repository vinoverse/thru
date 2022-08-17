import React, {useEffect} from 'react';
import { connectors } from './Connector';
import { useWeb3React } from '@web3-react/core';
import { setAccount } from '../../Store';
import { useDispatch } from 'react-redux';
import { Redirect } from '@reach/router';

const WalletItem= (props) => {
    const { account, activate, deactivate } = useWeb3React();
    const dispatcher = useDispatch();

    useEffect(() => {
        deactivate();
        dispatcher(setAccount(''));
    }, []);
    
    if (!!account) {
        dispatcher(setAccount(account));
    }

    const metamaskAppOpen = () => {
        let dappUrl = "waht.app";

        const mobileType = navigator.userAgent.toLowerCase();
        
        if(mobileType.indexOf('android') > -1) {
            dappUrl = "https://waht.app/";
        } 
    
        window.location.href="https://metamask.app.link/dapp/" + dappUrl;
    }

    return (
        <>
        {!account?
        <div className="row">
            {window.ethereum && window.ethereum.isMetaMask
            ?<div className="col-lg-3 mb30" onClick={() => {activate(connectors.injected);}}>
                <span className="box-url left p-3">
                    <img src="./img/wallet/1.png" alt="" className="mb20"/>
                    <h4>Metamask {typeof window.ethereum}</h4>
                    <p>Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.</p>
                </span>
            </div>
            :<div className="col-lg-3 mb30" onClick={metamaskAppOpen}>
                <span className="box-url left p-3">
                    <img src="./img/wallet/1.png" alt="" className="mb20"/>
                    <h4>Metamask {typeof window.ethereum}</h4>
                    <p>Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.</p>
                </span>
            </div>}
            
            <div className="col-lg-3 mb30" onClick={() => {activate(connectors.walletConnect)}}>
                <span className="box-url left p-3">
                    <img src="./img/wallet/4.png" alt="" className="mb20"/>
                    <h4>WalletConnect</h4>
                    <p>Open source protocol for connecting decentralised applications to mobile wallets.</p>
                </span>
            </div>
            <div className="col-lg-3 mb30" onClick={() => {activate(connectors.coinbaseWallet)}}>
                <span className="box-url left p-3">
                    <img src="./img/wallet/5.png" alt="" className="mb20"/>
                    <h4>Coinbase Wallet</h4>
                    <p>The easiest and most secure crypto wallet. ... No Coinbase account required.</p>
                </span>
            </div>
        </div>
        :<Redirect noThrow={true} to="/mynft"/>}
        </>
    )
  
};
export default WalletItem;