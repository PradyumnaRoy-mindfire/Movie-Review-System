import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../services/movieService";
import { logError } from "../utils/errorLogger";

const useMovieDetails = (id) => {
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

export default useMovieDetails;
