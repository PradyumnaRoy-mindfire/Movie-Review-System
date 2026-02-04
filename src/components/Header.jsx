import styles from "../css/header.module.css";
import CircularText from "./animation/CircularText.jsx";

import Navbar from "./Navbar.jsx";

const Header = () => {
  return (
    <div className={styles.app}>
      {/* navbar component */}
      <Navbar />

      {/* hero section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <h1 className="text-white z-2 text-8xl text-center">CINEFLIX</h1>
      </div>

      {/* circular text animation */}
      <CircularText
        text="Welcome*To*CINEFLIX*"
        onHover="speedUp"
        spinDuration={20}
        className={styles.circularText}
      />
    </div>
  );
};

export default Header;
