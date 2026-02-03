import useFetchGenres from "../../services/fetchGenresFromApiService";

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const { genres } = useFetchGenres();

  return (
    <div className="w-[85%] mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Filter by Genres</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onGenreChange(null)}
          className={`px-3 py-2 rounded-lg font-medium transition-all text-sm border border-purple-400 ${
            selectedGenre === null
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
              : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700"
          }`}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 border border-purple-400  
                         w-fit whitespace-nowrap ${
                           selectedGenre === genre.id
                             ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                             : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700"
                         }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
