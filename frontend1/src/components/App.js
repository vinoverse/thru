import React, {useState, useEffect} from 'react';
import { Router, Location } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Explore from './pages/Explore';
import Wallet from './pages/Wallet';

import { createGlobalStyle } from 'styled-components';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useDispatch } from 'react-redux';
import { setDomain } from '../Store';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0,0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  return (
  <div className="wraper">
  <GlobalStyles />
    <Header/>
      <Web3ReactProvider getLibrary={getLibrary}>
      <PosedRouter>
        <ScrollTop path="/">
          <Wallet path="/"/>
          <Explore path="/explore"/>
        </ScrollTop>
      </PosedRouter>
      </Web3ReactProvider>
    <ScrollToTopBtn />
    
  </div>
  );
}
export default App;