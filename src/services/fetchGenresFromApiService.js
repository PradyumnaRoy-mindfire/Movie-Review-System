import { useState, useEffect } from "react";
import { logError } from "../utils/errorLogger";
import useLoading from "../customHooks/useLoading.js";

const genreApiUrl = import.meta.env.VITE_GENRE_URL;

function useFetchGenres() {
  const [genres, setGenre] = useState([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    let mounted = true;

    (async function genreData() {
      setIsLoading(true);
      try {
        const res = await fetch(genreApiUrl, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`Genre API failed with status ${res.status}`);
        }

        const data = await res.json();
        if (mounted) setGenre(data.genres);
      } catch (error) {
        logError(error, "Genre API Fetch");
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setIsLoading]);

  const genreNameIdMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

  return { genres, genreNameIdMap };
}

export default useFetchGenres;
