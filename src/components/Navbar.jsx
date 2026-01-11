//for text animation of the logo 
import TextType from './animation/TextType';
import styles from '../css/header.module.css'
import { Link } from 'react-router-dom';

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
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/favourites" className={styles.navLink}>Favourites</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
          </div>
        </div>
      </nav>
  )
}

export default Navbar