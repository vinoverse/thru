import React from 'react';
import ColumnNew from '../components/ColumnNew';
import Footer from '../components/footer';
import { useSelector } from 'react-redux';
import { Redirect } from '@reach/router';


const Explore= () => {
  const {account} = useSelector((store) => store);

  return (
    <>
    {account
      ?<div>
        <section className='jumbotron breadcumb no-bg'>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>My NFT</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='container'>
          <ColumnNew/>
        </section>
        <Footer />
      </div>
      :<Redirect noThrow={true} to="/"/>
    }
    </>
  );
};

export default Explore;