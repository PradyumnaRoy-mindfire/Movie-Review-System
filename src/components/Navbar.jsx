//for text animation of the logo 
import TextType from './animation/TextType';
import styles from '../css/header.module.css'
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.navbarLogo}>
            <TextType
              text={["CineFLIX"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter=""
              className={styles.logoText}
            />
          </div>

          <div className={styles.navbarLinks}>
            <NavLink to="/" className={({ isActive })=> `${styles.navLink} ${isActive ? styles.activeLink : ""}`}>Home</NavLink>
            <NavLink to="/favourites" className={({ isActive })=> `${styles.navLink} ${isActive ? styles.activeLink : ""}`}>Favourites</NavLink>
            <NavLink to="/about-us" className={({ isActive })=> `${styles.navLink} ${isActive ? styles.activeLink : ""}`}>About Us</NavLink>
          </div>
        </div>
      </nav>
  )
}

export default Navbar