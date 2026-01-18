import useFavourite from '../../customHooks/useFavourite'
import Navbar from "../Navbar.jsx";
import { useState, useEffect } from 'react';
import { Star, Calendar, Grip } from 'lucide-react';
import DropZone from '../DropZone.jsx';

const Favourite = () => {
  const { favourites, toggleFavourite, isFavourite } = useFavourite();
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [draggedMovie, setDraggedMovie] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  // Load watch later movies from localStorage initially
  useEffect(() => {
    const storedWatchLater = localStorage.getItem('watchLaterMovies');
    if (storedWatchLater) {
      try {
        const parsed = JSON.parse(storedWatchLater);
        setWatchLaterMovies(parsed);
      } catch (error) {
        console.error('Error loading watch later movies:', error);
        setWatchLaterMovies([]);
      }
    }
  }, []); 

  // Update favouriteMovies and filter out movies that are in watchLater to separate the favourite and watchlater movie
  useEffect(() => {
    const filteredFavourites = favourites.filter(
      (fav) => !watchLaterMovies.some((watch) => watch.id === fav.id)
    );
    setFavouriteMovies(filteredFavourites);
  }, [favourites, watchLaterMovies]);

  // save the watch later movies to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchLaterMovies', JSON.stringify(watchLaterMovies));
  }, [watchLaterMovies]);

  const handleDragStart = (movie, from) => (e) => {
    setDraggedMovie(movie);
    setDraggedFrom(from);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedMovie(null);
    setDraggedFrom(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (targetList) => (e) => {
    e.preventDefault();
    
    if (!draggedMovie || !draggedFrom) return;
    if (draggedFrom === targetList) return;

    if (draggedFrom === 'favourites') {
      setFavouriteMovies((prev) => prev.filter((m) => m.id !== draggedMovie.id));
      setWatchLaterMovies((prev) => [...prev, draggedMovie]);
    } else {
      setWatchLaterMovies((prev) => prev.filter((m) => m.id !== draggedMovie.id));
      setFavouriteMovies((prev) => [...prev, draggedMovie]);
    }

    setDraggedMovie(null);
    setDraggedFrom(null);
  };

  return (
    <div className="w-full min-h-screen" style={{ background: 'linear-gradient(to bottom right, #111827, #581c87, #111827)' }}>
      <Navbar />
      
      <div className="mx-auto px-4 py-8 pt-24">
        <h1 className="text-2xl font-bold text-white mb-4 text-center underline underline-offset-5">
          My Collections
        </h1>
        
        <div className="bg-blue-500/14 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-300 text-sm flex items-center gap-2">
            <Grip className="w-4 h-4" />
            <span>
              <strong>Tip:</strong> Drag and drop movies between "Favourites" and "Watch Later" to organize your collection! Click on the Poster to see the movie details
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <DropZone
            title="⭐ Favourites"
            movies={favouriteMovies}
            onDrop={handleDrop('favourites')}
            onDragOver={handleDragOver}
            onDragStart={(movie) => handleDragStart(movie, 'favourites')}
            onDragEnd={handleDragEnd}
            isEmpty={draggedFrom === 'watchLater'}
          />
          
          <DropZone
            title="🕒 Watch Later"
            movies={watchLaterMovies}
            onDrop={handleDrop('watchLater')}
            onDragOver={handleDragOver}
            onDragStart={(movie) => handleDragStart(movie, 'watchLater')}
            onDragEnd={handleDragEnd}
            isEmpty={draggedFrom === 'favourites'}
          />
        </div>
      </div>
    </div>
  );
}

export default Favourite;