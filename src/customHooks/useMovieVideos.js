import { useQuery } from "@tanstack/react-query";
import { fetchMovieVideos } from "../services/movieService";
import { logError } from "../utils/errorLogger";

const useMovieVideos = (id) => {
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
    logError(error, "Error fetching movie videos");
  }

  return { videos, isLoading };
};

export default useMovieVideos;
