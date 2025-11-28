import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Telemedicine from './pages/Telemedicine';
import HospitalMap from './pages/HospitalMap';
import Pharmacy from './pages/Pharmacy';
import SecurityCheck from './pages/SecurityCheck';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/telemedicine" element={<Telemedicine />} />
            <Route path="/hospitals" element={<HospitalMap />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/security" element={<SecurityCheck />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

