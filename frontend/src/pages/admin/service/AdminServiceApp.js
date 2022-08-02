import React, {useEffect} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import QRScan from './QRScan';
import AdminHeader from './AdminHeader';
import Event from './Event';
import Logout from './Logout';
import Ticket from './Ticket';

const AdminServiceApp = (props) => {
    const {user} = props;

    if (user === null) {
        window.location.href="/admin/";
    }

    return (
        <>
            <AdminHeader />
            <Container>
                <Routes>
                    <Route path='/qrReader' element={<QRScan {...props}/>}></Route>
                    <Route path='/event' element={<Event {...props}/>}></Route>
                    <Route path='/ticket' element={<Ticket {...props}/>}></Route>
                    <Route path='/logout' element={<Logout {...props} />}></Route>                    
                </Routes>
            </Container>
        </>
    );
};

export default AdminServiceApp;