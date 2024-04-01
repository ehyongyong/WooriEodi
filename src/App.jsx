import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Map from './pages/Map';
import Card from './pages/Card';
import Subscribe from './pages/Subscribe';
import Mypage from './pages/Mypage';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/card" element={<Card />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Router>
    </div>
  );
}
