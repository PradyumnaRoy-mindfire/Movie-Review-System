import FavouriteMovieCard from './FavouriteMovieCard';

const DropZone = ({ title, movies, onDrop, onDragOver, onDragStart, onDragEnd, isEmpty }) => {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className={`flex-1 bg-gray-900/30 rounded-xl p-6 border-2 border-dashed transition-all ${
        isEmpty ? 'border-purple-500/50' : 'border-purple-500/30'
      }`}
    >
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        {title}
        <span className="text-sm font-normal text-gray-400">({movies.length})</span>
      </h2>
      
      <div className="space-y-3">
        {movies.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Drag movies here</p>
          </div>
        ) : (
          movies.map((movie) => (
            <FavouriteMovieCard
              key={movie.id}
              movie={movie}
              onDragStart={onDragStart(movie)}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DropZone;