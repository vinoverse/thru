import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/admin/Login';
import Signup from './pages/admin/Signup';
import AdminServiceApp from './pages/admin/service/AdminServiceApp';

function App() {
  const [apiDomain, setApiDomain] = useState("");

  const getDoamin = () => {
    let domain = window.location.origin;

    if (domain.search("http://localhost") > -1) {
      domain = "http://localhost";
    }

    domain += ":8080";
    setApiDomain(domain);
  }

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
    getDoamin();
  }, []);

  return (
    <>
    <Routes>
      <Route path='/' element={<Login login={login} apiDomain={apiDomain}/>} ></Route>
      <Route path='/signup' element={<Signup apiDomain={apiDomain}/>}></Route>
      <Route path="/*" element={<AdminServiceApp logout={logout} user={user} apiDomain={apiDomain}/>}></Route>
    </Routes>
    </>
  );
}

export default App; 
