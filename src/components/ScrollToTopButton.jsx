import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    window.history.back();
  };

  // On home page, only show when scrolled (scroll-to-top mode)
  // On other pages, always show (back mode when not scrolled, scroll-to-top when scrolled)
  const shouldShowButton = isHomePage ? isScrolled : true;
  const isBackMode = !isScrolled && !isHomePage;

  if (!shouldShowButton) {
    return null;
  }

  return (
    <button
      onClick={isBackMode ? goBack : scrollToTop}
      className="scroll-to-top-btn visible"
      aria-label={isBackMode ? "Go back" : "Scroll to top"}
      title={isBackMode ? "Go back" : "Scroll to top"}
    >
      {isBackMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      )}
    </button>
  );
};

export default ScrollToTopButton;
