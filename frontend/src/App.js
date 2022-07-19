import './App.css';

import { Route, Routes } from 'react-router-dom';
import AdminApp from './pages/admin/AdminApp';
import ServiceApp from './pages/ServiceApp';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    getDoamin();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/*' element={<ServiceApp apiDomain={apiDomain}/>}></Route>
        <Route path='/admin/*' element={<AdminApp apiDomain={apiDomain}/>}></Route>
      </Routes>
    </>
  );
}

export default App; 
