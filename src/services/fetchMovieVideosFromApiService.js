import { useQuery } from "@tanstack/react-query";
import { logError } from "../utils/errorLogger";

const movieBaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const fetchMovieVideos = async (id) => {
  const movieVideosApiUrl = `${movieBaseUrl}/movie/${id}/videos?api_key=${API_KEY}`;

  const response = await fetch(movieVideosApiUrl);

  if (!response.ok) {
    throw new Error(`Movie Videos API failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
};

const useFetchMovieVideos = (id) => {
  const {
    data: videos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieVideos", id],
    queryFn: () => fetchMovieVideos(id),
    enabled: !!id, // Only fetch if id exists
  });

  if (error) {
    logError(error, ":Error fetching movie videos");
  }

  return { videos, isLoading };
};

export default useFetchMovieVideos;
