import React, { useState } from 'react';
import axios from 'axios';

const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: '', lon: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocation(prevLocation => ({ ...prevLocation, [name]: value }));
  };

  const fetchNearbyRestaurants = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/nearby-restaurants/?lat=${location.lat}&lon=${location.lon}`);
      setRestaurants(response.data);
    } catch (error) {
      setError('Failed to fetch nearby restaurants. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="mb-4">Nearby Restaurants</h1>
      
      <form onSubmit={fetchNearbyRestaurants} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              name="lat"
              placeholder="Latitude"
              value={location.lat}
              onChange={handleInputChange}
              step="any"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              name="lon"
              placeholder="Longitude"
              value={location.lon}
              onChange={handleInputChange}
              step="any"
              required
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">Find Nearby Restaurants</button>
          </div>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      
      <div className="bg-white p-4 rounded shadow">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="col">
              <div className="card h-100">
                <img src={restaurant.image} className="card-img-top" alt={restaurant.name} style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">Rating: {restaurant.rating}</p>
                  <p className="card-text">Cuisines: {restaurant.cuisines}</p>
                  <p className="card-text">Distance: {restaurant.distance} km</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyRestaurants;