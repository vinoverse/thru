import React, {useEffect, useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import AdminServiceApp from './service/AdminServiceApp';

const AdminApp = (props) => {
    //{authenticated 
    //    ? <Route path='/*' element={<AdminServiceApp logout={logout}/>}></Route> 
    //    : <Route path='/*' element={<Navigate to="/admin/login" />}></Route>}

    const [user, setUser] = useState('');

    const login = (token) => {
        window.localStorage.setItem('thruUser', token);
        setUser(token);
    }

    const logout = () => {
        window.localStorage.removeItem('thruUser');
        setUser('');
    }

    useEffect(() => {
        const thruUser = window.localStorage.getItem('thruUser');
        setUser(thruUser);
    }, []);

    return (
        <>
            <Routes>
                <Route path='/login' element={<Login login={login} {...props}/>} ></Route>
                <Route path='/signup' element={<Signup {...props}/>}></Route>
                <Route path="/*" element={<AdminServiceApp logout={logout} user={user} {...props}/>}></Route>
            </Routes>
        </>
    );
};

export default AdminApp;