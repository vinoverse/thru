import React from 'react';
import Header from './Header';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';
import NFTList from './NFTList';
import MasonryLayout from '../MasonryLayout/MasonryLayout';

const ServiceApp = () => {
    return (
        <>
            <Header />
            <Container>
            <Routes>
                <Route path='/' element={<ConnectWallet />}></Route>
                <Route path='/nftList' element={<NFTList />}></Route>
                <Route path='/layout' element={<MasonryLayout />}></Route>
            </Routes>
            </Container>
        </>
    );
};

export default ServiceApp;