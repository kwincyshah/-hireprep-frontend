import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Accountancy from './pages/Accountancy';
import MechanicalEngineering from './pages/MechanicalEngineering';
import DigitalMarketing from './pages/DigitalMarketing';
import SalesExecutive from './pages/SalesExecutive';
import Manager from './pages/Manager';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/category/accountancy" element={<Accountancy />} />
      <Route path="/category/mechanical-engineering" element={<MechanicalEngineering />} />
      <Route path="/category/digital-marketing" element={<DigitalMarketing />} />
      <Route path="/category/sales-executive" element={<SalesExecutive />} />
      <Route path="/category/manager" element={<Manager />} />
    </Routes>
  );
}

export default App;