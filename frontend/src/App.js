import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/admin/Login';
import Signup from './pages/admin/Signup';
import AdminServiceApp from './pages/admin/service/AdminServiceApp';

function App() {
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
      <Route path='/admin' element={<Login login={login}/>} ></Route>
      <Route path='/admin/signup' element={<Signup />}></Route>
      <Route path="/admin/*" element={<AdminServiceApp logout={logout} user={user}/>}></Route>
    </Routes>
    </>
  );
}

export default App; 
