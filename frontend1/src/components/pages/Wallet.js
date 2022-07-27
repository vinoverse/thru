import React from 'react';
import WalletItem from '../components/WalletItem';
import Footer from '../components/footer';

const Wallet = (props) => {
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
        <WalletItem {...props} />
      </section>
      <Footer />
    </div>
  );
};
export default Wallet;