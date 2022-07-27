import React, { useEffect } from 'react';
import WalletItem from '../components/WalletItem';
import Footer from '../components/footer';
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom';


const Wallet = () => {
  const { account, activate } = useWeb3React();

  return (
    <div>
      <section className='jumbotron breadcumb no-bg' >
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Wallet</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container'>
        <WalletItem account={account} activate={activate}/>
      </section>
      <Footer />
    </div>
  );
};
export default Wallet;