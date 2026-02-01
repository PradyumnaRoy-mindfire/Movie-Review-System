import { useEffect, useState } from "react";
import { logError } from "../utils/errorLogger.js";
import useLoading from "../customHooks/useLoading.js";

const movieBaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const useFetchMovieDetails = (id) => {
  const movieDetailsApiUrl = `${movieBaseUrl}/movie/${id}?api_key=${API_KEY}`;
  const [movie, setMovie] = useState("");
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(movieDetailsApiUrl, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`Movie Details API failed with status ${res.status}`);
        }

        const data = await res.json();
        if (mounted) setMovie(data);
      } catch (error) {
        logError(error, "Movie Details API Fetch");
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    if (id) {
      fetchData();
    } else {
      if (mounted) setMovie("");
    }

    return () => {
      mounted = false;
    };
  }, [movieDetailsApiUrl, setIsLoading, id]);

  return { movie, isLoading };
};

export default useFetchMovieDetails;
