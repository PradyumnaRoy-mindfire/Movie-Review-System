import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../services/genreService";
import { logError } from "../utils/errorLogger";

const useGenres = () => {
  const {
    data: genres = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 30 * 60 * 1000, // 30 mins - Time during which data is considered cached
  });

  if (error) {
    logError(error, "Genre API Fetch");
  }

  const genreNameIdMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

  return { genres, genreNameIdMap, isLoading };
};

export default useGenres;
