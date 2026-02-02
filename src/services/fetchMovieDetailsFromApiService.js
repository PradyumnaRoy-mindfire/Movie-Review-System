import { useQuery } from "@tanstack/react-query";
import { logError } from "../utils/errorLogger.js";

const movieBaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const fetchMovieDetails = async (id) => {
  const movieDetailsApiUrl = `${movieBaseUrl}/movie/${id}?api_key=${API_KEY}`;

  const res = await fetch(movieDetailsApiUrl, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Movie Details API failed with status ${res.status}`);
  }

  return res.json();
};

const useFetchMovieDetails = (id) => {
  const {
    data: movie = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id, // Only fetch if id exists
  });

  if (error) {
    logError(error, "Movie Details API Fetch");
  }

  return { movie, isLoading };
};

export default useFetchMovieDetails;
