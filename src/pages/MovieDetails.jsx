import { useParams,useLocation } from "react-router-dom";
import FetchMovieDetailsFromApi from "../components/api/FetchMovieDetailsFromApi";
import Navbar from "../components/Navbar";
import FavouriteButton from "../components/addToFavourite/FavouriteButton";
import MovieVideos from "../components/seeMovieDetails/MovieVideos";
import LoadingEffect from "../components/animation/LoadingEffect";
import FadeInAnimation from "../components/animation/FadeInAnimation";

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const imdbBaseUrl = import.meta.env.VITE_IMDB_BASE_URL;
const placeholderImageUrl = import.meta.env.VITE_PLACEHOLDER_IMAGE_URL


const MovieDetails = () => {
  //the name ':id' must be same as the fetching variable with userParams
  const { id } = useParams();

  const {state} = useLocation();
  const genres = state.genres;

  const { movie, isLoading } =  FetchMovieDetailsFromApi(id);

  const backdropUrl = movie.backdrop_path ? `${imageBaseUrl}original${movie.backdrop_path}` : placeholderImageUrl;
  const posterUrl = movie.poster_path ? `${imageBaseUrl}w500${movie.poster_path}` : placeholderImageUrl;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-purple-900 to-gray-700">
      {/* Backdrop Section */}
      {backdropUrl && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-60 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          {posterUrl && (
            <div className="flex-shrink-0 mt-[280px] ml-[-60px]">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full md:w-96 rounded-lg shadow-2xl"
              />
            </div>
          )}

          {/* Movie Info */}
          <div className="flex-1 text-white">
            <FadeInAnimation type="movieDetails">
            <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-xl italic text-gray-300 mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <span className="bg-green-600 px-3 py-1 rounded-full font-bold inline-flex items-center h-9">{movie.release_date}</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full font-bold inline-flex items-center h-9">{formatRuntime(movie.runtime)}</span>
              <span className="bg-purple-600  px-3 py-1 rounded-full font-bold inline-flex items-center h-9">
                ⭐ {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)
              </span>
              <span className="-mt-1.5">
                  <FavouriteButton movie={movie} />
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="border border-purple-400 text-purple-300 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Status</h3>
                <p className="text-gray-300">{movie.status}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Original Language</h3>
                <p className="text-gray-300">{movie.original_language?.toUpperCase()}</p>
              </div>

              {movie.budget > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Budget</h3>
                  <p className="text-gray-300">{formatCurrency(movie.budget)}</p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Revenue</h3>
                  <p className="text-gray-300">{formatCurrency(movie.revenue)}</p>
                </div>
              )}
            </div>
           
            {/* Production Companies */}
            {movie.production_companies?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-3">Production Companies</h3>
                <div className="flex flex-wrap gap-6">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="flex flex-col items-center">
                      {company.logo_path ? (
                        <img
                          src={`${imageBaseUrl}w200${company.logo_path}`}
                          alt={company.name}
                          className="h-12 object-contain bg-white p-2 rounded mb-2"
                        />
                      ) : (
                        <div className="h-12 flex items-center justify-center bg-gray-700 px-4 rounded mb-2">
                          <span className="text-xs text-center">{company.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Production Countries Details */}
            {movie.production_countries?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Production Countries</h3>
                <p className="text-gray-300">
                  {movie.production_countries.map(c => c.name).join(', ')}
                </p>
              </div>
            )}

            {/* Spoken Languages */}
            {movie.spoken_languages?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Spoken Languages</h3>
                <p className="text-gray-300">
                  {movie.spoken_languages.map(l => l.english_name).join(', ')}
                </p>
              </div>
            )}

            {/* External Links */}
            <div className="flex gap-4 mt-8">
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Official Website
                </a>
              )}
              {movie.imdb_id && (
                <a
                  href={`${imdbBaseUrl}${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition"
                >
                  View on IMDb
                </a>
              )}
            </div>
         </FadeInAnimation>
          </div>
        </div>
      <div className="mt-5 ">
        <MovieVideos id={movie.id} />
      </div>
      </div>
              {/* Loading Effect show */}
      {isLoading && (<LoadingEffect />)}

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
    </>
  )
}

export default MovieDetails