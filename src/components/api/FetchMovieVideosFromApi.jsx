import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingEffect from "../animation/LoadingEffect";
import FetchMovieDetailsFromApi from "../api/FetchMovieDetailsFromApi";
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY 


const FetchMovieVideosFromApi = (id) => {
    const movieVideosApiUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    const [videos, setVideos] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(movieVideosApiUrl)
        .then(res => res.json())
        .then(data => {
            setVideos(data.results);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);
    
  return { videos }
}

export default FetchMovieVideosFromApi