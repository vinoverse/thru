import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import QRScan from './QRScan';
import AdminHeader from './AdminHeader';
import Event from './Event';
import Logout from './Logout';

const AdminServiceApp = () => {
    return (
        <>
            <AdminHeader />
            <Container>
                <Routes>
                    <Route path='/qrReader' element={<QRScan />}></Route>
                    <Route path='/event' element={<Event />}></Route>
                    <Route path='/logout' element={<Logout />}></Route>
                </Routes>
            </Container>
        </>
    );
};

export default AdminServiceApp;