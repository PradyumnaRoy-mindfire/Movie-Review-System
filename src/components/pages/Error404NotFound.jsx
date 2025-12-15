import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxOffset = isHovering ? 20 : 10;
  const offsetX = (mousePosition.x / window.innerWidth - 0.5) * parallaxOffset;
  const offsetY = (mousePosition.y / window.innerHeight - 0.5) * parallaxOffset;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            top: '20%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'blob 7s infinite'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            top: '40%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'blob 7s infinite 2s'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            bottom: '20%',
            left: '30%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'blob 7s infinite 4s'
          }}
        />
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          33% { 
            transform: translate(30px, -50px) scale(1.1); 
          }
          66% { 
            transform: translate(-20px, 20px) scale(0.9); 
          }
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div 
          className="relative mb-8 animate-float"
          style={{
            transform: `translate(${offsetX}px, ${offsetY}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <h1 
            className="text-9xl md:text-[12rem] font-bold leading-none tracking-tight"
            style={{
              background: 'linear-gradient(to right, rgb(192, 132, 252), rgb(244, 114, 182), rgb(96, 165, 250))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))'
            }}
          >
            404
          </h1>
          {/* <div 
            className="absolute inset-0 text-9xl md:text-[12rem] font-bold -z-10"
            style={{
              color: 'rgb(168, 85, 247)',
              filter: 'blur(40px)',
              opacity: 0.5
            }}
          >
            404
          </div> */}
        </div>

        {/* Main content */}
        <div className="glass-effect p-8 rounded-3xl shadow-2xl h-80" >
          <h2 className="text-3xl md:text-4xl font-bold text-white  ">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-300 max-w-md mx-auto mb-6">
            The page you're looking for seems to have wandered off into the digital void. 
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-[60px]" >
            <button
              onClick={() => window.history.back()}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group flex items-center gap-2 px-6 py-3 text-white rounded-full font-medium transition-all duration-300 glass-effect w-[180px] h-[30px] justify-center"
              style={{ 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transform: isHovering ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <ArrowLeft 
                className="w-5 h-5 transition-transform duration-300" 
                style={{ transform: isHovering ? 'translateX(-4px)' : 'translateX(0)' }}
              />
              Go Back
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="group flex items-center gap-2 px-6 py-3 text-white rounded-full font-medium transition-all duration-300  w-[180px] h-[30px] justify-center"
              style={{
                background: 'linear-gradient(to right, rgb(168, 85, 247), rgb(59, 130, 246))',
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, rgb(147, 51, 234), rgb(37, 99, 235))';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, rgb(168, 85, 247), rgb(59, 130, 246))';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Home className="w-5 h-5" />
              Home Page
            </button>
          </div>

          <div className="pt-6 mt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p className="text-gray-400 text-sm mb-3">Or try searching for what you need:</p>
            
              {/* <Search className="absolute left-4 top-1/2 w-5 h-5 text-gray-400" style={{ transform: 'translateY(-50%)' }} /> */}
            </div>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  );
}