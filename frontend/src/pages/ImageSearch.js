
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageSearch = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState([]); // State to hold fetched restaurants
  const [showResults, setShowResults] = useState(false); // State to show/hide results

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please upload an image.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      const detectedCuisine = response.data.result.trim();
      setResult(detectedCuisine);
      setShowResults(true);

      // Fetch restaurants based on the detected cuisine
      const params = new URLSearchParams({ cuisines: detectedCuisine });
      const restaurantsResponse = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/?${params}`
      );
      
      console.log("Fetched restaurants:", restaurantsResponse.data); // Debugging line

      setRestaurants(restaurantsResponse.data);

      if (restaurantsResponse.data.length === 0) {
        setError('No restaurants found for the detected cuisine.');
      }
    } catch (error) {
      setLoading(false);
      setError('Error processing the image or fetching data.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Search through Image</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <input 
            type="file" 
            className="form-control" 
            onChange={handleFileChange} 
            accept="image/*" 
          />
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">
            {loading ? 'Processing...' : 'Upload and Search'}
          </button>
        </div>
        {/* {result && <div className="mt-4"><h3>Detected Cuisine:</h3><p>{result}</p></div>} */}
      </form>
      
      {showResults && (
        <div className="mt-5">
          <h2>Restaurants Offering "{result}" Cuisine:</h2>
          {restaurants.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {restaurants.map((restaurant, index) => (
                <div key={index} className="col">
                  <div className="card h-100">
                    <img
                      src={restaurant.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/330px-Restaurant_N%C3%A4sinneula.jpg"}
                      className="card-img-top"
                      alt={restaurant.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{restaurant.name}</h5>
                      <p className="card-text">Rating: {restaurant.rating}</p>
                      <p className="card-text">Cuisines: {restaurant.cuisines}</p>
                      <p className="card-text">
                        Average Cost for Two: {restaurant.average_cost_for_two}
                      </p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        Country: {getCountryName(restaurant.country)}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No restaurants found for the detected cuisine.</p>
          )}
        </div>
      )}
    </div>
  );
};

const countryCodeMap = {
  1: "India",
  14: "Australia",
  30: "Brazil",
  37: "Canada",
  94: "Indonesia",
  148: "New Zealand",
  162: "Phillipines",
  166: "Qatar",
  184: "Singapore",
  189: "South Africa",
  191: "Sri Lanka",
  208: "Turkey",
  214: "UAE",
  215: "United Kingdom",
  216: "United States",
};

const getCountryName = (code) => {
  return countryCodeMap[code] || "Unknown Country";
};

export default ImageSearch;
