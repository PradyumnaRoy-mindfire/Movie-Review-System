import React from 'react';
import { Film, Heart, Search, Star, TrendingUp, Users, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

export default function AboutUs() {
  const features = [
    {
      icon: <Film className="w-8 h-8" />,
      title: "Infinite Movie Discovery",
      description: "Browse through thousands of movies with seamless infinite scroll. Never run out of content to explore."
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Filtering",
      description: "Filter movies by genre, release year, rating, and more. Find exactly what you're in the mood for."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Favorites & Watchlist",
      description: "Mark movies as favorites and drag them to your watch later section. Your personalized cinema awaits."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Detailed Reviews",
      description: "Access comprehensive movie information including budget, ratings, cast, and related videos."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "External Links",
      description: "Quick access to official movie websites and IMDb pages for deeper exploration."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Notifications",
      description: "Get instant feedback when adding or removing movies from your favorites."
    }
  ];

  const stats = [
    { number: "50K+", label: "Movies" },
    { number: "100K+", label: "Active Users" },
    { number: "1M+", label: "Reviews" },
    { number: "24/7", label: "Updates" }
  ];

  const team = [
      {
          name: "Pradyumna Roy",
          role: "Founder & CEO",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
        name: "Bimal Kumar",
        role: "Chief Product Officer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
        name: "Raka Bhai",
        role: "Head of Content",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
        name: "Ganesh Panda",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    }
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&h=900&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-600 bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-500">
            <Film className="w-5 h-5" />
            <span className="text-sm font-semibold">CineFlix Movie Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Your Ultimate Movie Companion
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover, organize, and explore the world of cinema like never before. CineFlix brings you an immersive movie browsing experience.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
              Get Started
            </button>
             <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-8 py-3 rounded-full font-semibold transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-purple-900 from-opacity-50 to-pink-900 to-opacity-50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500 border-opacity-30">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            At CineFlix, we believe that discovering your next favorite movie should be an experience in itself. 
            We've built a platform that combines powerful search capabilities, intelligent filtering, and personalized 
            recommendations to help movie enthusiasts explore the vast world of cinema. Whether you're a casual viewer 
            or a dedicated cinephile, our intuitive interface and comprehensive database make it easy to find, organize, 
            and enjoy movies that match your taste.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-gray-400 text-lg">Everything you need for the perfect movie discovery experience</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:bg-opacity-10 hover:border-purple-500 transition-all group"
            >
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-600 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-purple-500">
            <Users className="w-5 h-5" />
            <span className="text-sm font-semibold">Meet Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The People Behind CineFlix</h2>
          <p className="text-gray-400 text-lg">Passionate movie lovers building the future of film discovery</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent opacity-60"></div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-purple-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-90"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&h=600&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          <div className="relative px-8 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8 text-white text-opacity-90 max-w-2xl mx-auto">
              Join thousands of movie enthusiasts who have already discovered their next favorite film on CineFlix
            </p>
            <Link to="/" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              Explore Movies Now
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}