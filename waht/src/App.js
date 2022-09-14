import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ConnectWallet from './pages/ConnectWallet';
import MainNFT from './pages/MainNFT';
import MainEvent from './pages/MainEvent';
import NFTInfo from './pages/NFTInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ConnectWallet />} ></Route>
        <Route path='/main' element={<MainNFT />} ></Route>
        <Route path='/mainEvent' element={<MainEvent />} ></Route>
        <Route path='/nftInfo' element={<NFTInfo />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
