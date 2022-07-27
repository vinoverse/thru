import React from 'react';
import { connectors } from './Connector';

const WalletItem= (props) => {
    const { account, activate } = props;

    console.log(account);

    return (
        <div className="row">
            <div className="col-lg-3 mb30">
                <span className="box-url left p-3" onClick={() => {activate(connectors.injected);}}>
                    <img src="./img/wallet/1.png" alt="" className="mb20"/>
                    <h4>Metamask</h4>
                    <p>Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.</p>
                </span>
            </div>
            <div className="col-lg-3 mb30">
                <span className="box-url left p-3">
                    <img src="./img/wallet/4.png" alt="" className="mb20"/>
                    <h4>WalletConnect</h4>
                    <p>Open source protocol for connecting decentralised applications to mobile wallets.</p>
                </span>
            </div>
            <div className="col-lg-3 mb30">
                <span className="box-url left p-3">
                    <img src="./img/wallet/5.png" alt="" className="mb20"/>
                    <h4>Coinbase Wallet</h4>
                    <p>The easiest and most secure crypto wallet. ... No Coinbase account required.</p>
                </span>
            </div>
        </div>
    )
  
};
export default WalletItem;