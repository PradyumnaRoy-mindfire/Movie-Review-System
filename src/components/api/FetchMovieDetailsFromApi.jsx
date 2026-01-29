import { useEffect, useState } from "react";
import { logError } from "../../utils/errorLogger";
import useLoading from "../../customHooks/useLoading";

const movieBaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const FetchMovieDetailsFromApi = (id) => {
  const movieDetailsApiUrl = `${movieBaseUrl}/movie/${id}?api_key=${API_KEY}`;
  const [movie, setMovie] = useState("");
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        setIsLoading(true);

        const res = await fetch(movieDetailsApiUrl, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`Movie Details API failed with status ${res.status}`);
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        logError(error, "Movie Details API Fetch");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { movie, isLoading };
};

export default FetchMovieDetailsFromApi;
