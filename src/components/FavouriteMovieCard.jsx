import { Star, Calendar, Grip } from 'lucide-react';
import FavouriteButton from './FavouriteButton';
import { Link } from 'react-router-dom';
import GenreData from './api/FetchGenresFromApi';
import { useState } from 'react';

const FavouriteMovieCard = ({ movie, onDragStart, onDragEnd }) => {
  const {genres, genreNameIdMap } = GenreData();

  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  const [hidden, setHidden] = useState(false);

  if (hidden){
    return null;
  } 

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="bg-gray-800/50 rounded-lg p-3 border border-purple-500/30 hover:border-purple-500 transition-all cursor-move hover:shadow-lg hover:shadow-purple-500/20 group"
    >
      <div className="flex items-center gap-3">
          <div className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
            <Grip className="w-5 h-5 text-purple-400" />
          </div>
          
        <Link to={`/movies/${movie.id}/details`} state={{genres}}>
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-16 h-24 object-cover rounded flex-shrink-0"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
            }}
          />
          </Link>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm mb-2 truncate">
              {movie.title}
            </h3>
            
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span>{movie.vote_average}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-400" />
                <span>{movie.release_date}</span>
              </div>
            </div>
          </div>
          
            <div className="flex-shrink-0 float-end">
              <FavouriteButton movie={movie} hide={() => setHidden(true)}/>
            </div>
      </div>
    </div>
  );
};

export default FavouriteMovieCard;