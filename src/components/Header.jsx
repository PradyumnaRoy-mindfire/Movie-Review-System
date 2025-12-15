// import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import CircularText from './animation/CircularText.jsx';
//for text animation of the logo 
import TextType from './animation/TextType';


function Header() {

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <TextType 
                  text={["CineFLIX"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter=""
                  className="logo-text"
                />
          </div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favourites" className="nav-link">Favourites</Link>
            <Link to="/about" className="nav-link">About</Link>
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