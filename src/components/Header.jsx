// import React from "react";
import "../css/header.css";
import CircularText from './CircularText.jsx';


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
            <a href="/" className="nav-link">Home</a>
            <a href="favourites" className="nav-link">Favourites</a>
            <a href="about" className="nav-link">About</a>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-overlay"></div>
      </div>

        <CircularText
                text="Welcome*To*CINEFLIX*"
                onHover="speedUp"
                spinDuration={20}
                className="circular-text"
        />
      
    </div>
  );
}

export default Header;