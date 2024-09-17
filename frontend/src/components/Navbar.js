import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Make sure to import the custom CSS
import logo from './logo.png'; // Replace with the actual path to your logo

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#E23744' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" /> {/* Add logo */}
          {/* title here if any */}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/">Restaurant List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/nearby">Nearby Restaurants</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/image-search">Image Search</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
