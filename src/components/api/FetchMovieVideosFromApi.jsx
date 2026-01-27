import { useEffect, useState } from "react";
import useLoading from "../../customHooks/useLoading";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const FetchMovieVideosFromApi = (id) => {
    const movieVideosApiUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
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
                console.error("Error fetching movie videos:", error);
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
}

export default FetchMovieVideosFromApi;