import './App.css';

import { Route, Routes } from 'react-router-dom';
import AdminApp from './pages/admin/AdminApp';
import ServiceApp from './pages/ServiceApp';

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<ServiceApp />}></Route>
        <Route path='/admin/*' element={<AdminApp />}></Route>
      </Routes>
    </>
  );
}

export default App; 
