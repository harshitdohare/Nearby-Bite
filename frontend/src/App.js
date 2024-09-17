import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RestaurantList from './pages/RestaurantList';
import NearbyRestaurants from './pages/NearbyRestaurants';
import ImageSearch from './pages/ImageSearch';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="bg-light min-vh-100">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/nearby" element={<NearbyRestaurants />} />
            <Route path="/image-search" element={<ImageSearch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;