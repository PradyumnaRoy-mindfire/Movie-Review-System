import { useEffect, useState } from "react";
import { logError } from "../utils/errorLogger";
import useLoading from "../customHooks/useLoading.js";

const movieBaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const useFetchMovieVideos = (id) => {
  const movieVideosApiUrl = `${movieBaseUrl}/movie/${id}/videos?api_key=${API_KEY}`;
  const [videos, setVideos] = useState([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(movieVideosApiUrl);
        const data = await response.json();
        if (mounted) setVideos(data.results || []);
      } catch (error) {
        logError(error, ":Error fetching movie videos");
        if (mounted) setVideos([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    if (id) {
      fetchData();
    } else {
      setVideos([]);
    }

    return () => {
      mounted = false;
    };
  }, [movieVideosApiUrl, setIsLoading, id]);

  return { videos, isLoading };
};

export default useFetchMovieVideos;
