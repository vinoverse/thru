import React from 'react';

const ConnectWallet = () => {
    return (
        <>
            <section className="main-theme">
                <div className="container">
                    <div className="row">
                        <img src="https://vinoimg.s3.ap-northeast-2.amazonaws.com/vinoimg/yacht/VVY_NFT+01.gif" />
                    </div>
                </div>
            </section>
            <section className="login">
                <div className="container">
                    <div className="row">
                        <div className="login-title">
                            <span>Login With</span>
                        </div>
                        <div className="login-wallet">
                            <div className="wallet-type" id="metamask">
                                <img className="wallet-img" src="./img/wallet/metamask.png"/>
                                <span className="wallet-name">Metamask</span>
                            </div>
                            <div className="wallet-type" id="coinbase">
                                <img className="wallet-img" src="./img/wallet/coinbase.png"/>
                                <span className="wallet-name">Coinbase Wallet</span>
                            </div>
                            <div className="wallet-type" id="walletconnect">
                                <img className="wallet-img" src="./img/wallet/walletconnect.png"/>
                                <span className="wallet-name">Wallet Connect</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ConnectWallet;