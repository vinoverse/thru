import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import AdminServiceApp from './service/AdminServiceApp';

const AdminApp = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/*' element={<AdminServiceApp />}></Route>
            </Routes>
        </>
    );
};

export default AdminApp;