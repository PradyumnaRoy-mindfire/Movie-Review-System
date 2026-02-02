import { useQuery } from "@tanstack/react-query";
import { logError } from "../utils/errorLogger";

const genreApiUrl = import.meta.env.VITE_GENRE_URL;

const fetchGenres = async () => {
  const res = await fetch(genreApiUrl, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Genre API failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.genres || [];
};

function useFetchGenres() {
  const {
    data: genres = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 30 * 60 * 1000, // 30 minutes - genres don't change often
  });

  if (error) {
    logError(error, "Genre API Fetch");
  }

  const genreNameIdMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

  return { genres, genreNameIdMap, isLoading };
}

export default useFetchGenres;
