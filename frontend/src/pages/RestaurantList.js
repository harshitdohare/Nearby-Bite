import React, { useState, useEffect } from "react";
import axios from "axios";

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

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    country: "",
    minSpend: "",
    maxSpend: "",
    cuisines: "",
  });

  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(filters);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/?${params}`
      );
      setRestaurants(response.data);
    } catch (error) {
      setError("Failed to fetch restaurants. Please try again.");
    }
    setLoading(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div>
      <h1 className="mb-4">Welcome!</h1>

      <div className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="search"
              placeholder="Search by name or cuisine"
              value={filters.search}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="country"
              placeholder="Country ID"
              value={filters.country}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="col-md-2">
            <select
              className="form-control"
              name="country"
              value={filters.country} // assuming `filters.country` holds the country ID
              onChange={handleInputChange} // this will handle the change event
            >
              <option value="">Select Country</option>
              <option value="1">India</option>
              <option value="14">Australia</option>
              <option value="30">Brazil</option>
              <option value="37">Canada</option>
              <option value="94">Indonesia</option>
              <option value="148">New Zealand</option>
              <option value="162">Phillipines</option>
              <option value="166">Qatar</option>
              <option value="184">Singapore</option>
              <option value="189">South Africa</option>
              <option value="191">Sri Lanka</option>
              <option value="208">Turkey</option>
              <option value="214">UAE</option>
              <option value="215">United Kingdom</option>
              <option value="216">United States</option>
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="minSpend"
              placeholder="Min spend"
              value={filters.minSpend}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="maxSpend"
              placeholder="Max spend"
              value={filters.maxSpend}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="cuisines"
              placeholder="Cuisines"
              value={filters.cuisines}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="bg-white p-4 rounded shadow">
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
                  {/* <small className="text-muted">Country ID: {restaurant.country}</small> */}
                  <small className="text-muted">
                    Country: {getCountryName(restaurant.country)}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
