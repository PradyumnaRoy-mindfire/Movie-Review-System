import styles from "../css/header.module.css";
import CircularText from './animation/CircularText.jsx';

import Navbar from "./Navbar.jsx";

function Header() {

  return (
    <div className={styles.app}>
      
      <Navbar />

      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <h1  className="text-white z-2 text-8xl text-center">CINEFLIX</h1>
      </div>
      
      

      <CircularText
        text="Welcome*To*CINEFLIX*"
        onHover="speedUp"
        spinDuration={20}
        className={styles.circularText}
      />
    </div>

  );
}

export default Header;