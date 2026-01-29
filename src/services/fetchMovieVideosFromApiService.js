import { useEffect, useState } from "react";
import { logError } from "../utils/errorLogger";
import useLoading from "../customHooks/useLoading.js";

const movieBaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const fetchMovieVideosFromApi = (id) => {
  const movieVideosApiUrl = `${movieBaseUrl}/movie/${id}/videos?api_key=${API_KEY}`;
  const [videos, setVideos] = useState([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(movieVideosApiUrl);
        const data = await response.json();
        setVideos(data.results || []);
      } catch (error) {
        logError(error, ":Error fetching movie videos");
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  return { videos, isLoading };
};

export default fetchMovieVideosFromApi;
