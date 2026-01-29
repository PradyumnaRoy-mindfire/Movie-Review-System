import { useState, useEffect } from "react";
import { logError } from "../utils/errorLogger";
import useLoading from "../customHooks/useLoading.js";

const genreApiUrl = import.meta.env.VITE_GENRE_URL;

function FetchGenreData() {
  const [genres, setGenre] = useState([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    genreData();
  }, []);

  async function genreData() {
    setIsLoading(true);
    try {
      const res = await fetch(genreApiUrl, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`Genre API failed with status ${res.status}`);
      }

      const data = await res.json();
      setGenre(data.genres);
    } catch (error) {
      logError(error, "Genre API Fetch");
    } finally {
      setIsLoading(false);
    }
  }

  const genreNameIdMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

  return { genres, genreNameIdMap };
}

export default FetchGenreData;
