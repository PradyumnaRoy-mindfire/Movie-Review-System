// import React from "react";
import "./css/header.css";

function Header() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <h1>CineFLIX</h1>
          </div>
          <div className="navbar-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#favourites" className="nav-link">Favourites</a>
            <a href="#about" className="nav-link">About</a>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-overlay"></div>
      </div>

      
    </div>
  );
}

export default Header;