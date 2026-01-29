import { useState, useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHomeHovering, setIsHomeHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxOffset = isHovering ? 20 : 10;
  const offsetX = (mousePosition.x / window.innerWidth - 0.5) * parallaxOffset;
  const offsetY = (mousePosition.y / window.innerHeight - 0.5) * parallaxOffset;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 rounded-full opacity-20 bg-purple-500/40 blur-[60px] animate-blob" />
        <div className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full opacity-20 bg-blue-500/40 blur-[60px] animate-blob-delayed-2s" />
        <div className="absolute bottom-[20%] left-[30%] w-96 h-96 rounded-full opacity-20 bg-pink-500/40 blur-[60px] animate-blob-delayed-4s" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div
          className="relative mb-8 animate-float transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${offsetX}px, ${offsetY}px)`,
          }}
        >
          <h1 className="text-9xl md:text-[12rem] font-bold leading-none tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_25px_25px_rgb(0_0_0/0.15)]">
            404
          </h1>
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-16 rounded-3xl shadow-2xl h-80">
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-2.5">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-300 max-w-md mx-auto mb-1">
            The page you're looking for seems to have wandered off into the
            digital void. Let's get you back on track.
          </p>

          <div className="pt-1 mt-[50px] border-t border-white/10"></div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <button
              onClick={() => window.history.back()}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`group flex items-center gap-2 px-6 py-3 text-white rounded-full font-medium transition-all duration-300 bg-white/5 backdrop-blur-lg w-[180px] h-[30px] justify-center border border-white/20 ${
                isHovering ? "scale-105" : "scale-100"
              }`}
            >
              <ArrowLeft
                className={`w-5 h-5 transition-transform duration-300 ${
                  isHovering ? "-translate-x-1" : "translate-x-0"
                }`}
              />
              Go Back
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              onMouseEnter={() => setIsHomeHovering(true)}
              onMouseLeave={() => setIsHomeHovering(false)}
              className={`group flex items-center gap-2 px-6 py-3 text-white rounded-full font-medium transition-all duration-300 w-[180px] h-[30px] justify-center bg-gradient-to-r from-purple-600 to-blue-600 shadow-[0_10px_40px_rgba(168,85,247,0.3)] ${
                isHomeHovering
                  ? "scale-105 from-purple-700 to-blue-700"
                  : "scale-100"
              }`}
            >
              <Home className="w-5 h-5" />
              Home Page
            </button>
          </div>
        </div>

        <p className="mt-2 text-gray-500 text-sm">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  );
}
