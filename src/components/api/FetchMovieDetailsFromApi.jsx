import { useEffect, useState } from "react";
import useLoading from '../../customHooks/useLoading';

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const FetchMovieDetailsFromApi = (id) => {
    const movieDetailsApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    const [movie, setMovie] = useState('');
    const { isLoading, setIsLoading } = useLoading();
    

    useEffect(()=> {
        setIsLoading(true);
        async function fetchData () {
            let response = await fetch(movieDetailsApiUrl, {
                method: 'GET'
            });
            response = await response.json();
            setMovie(response);
            setIsLoading(false);
        }
        fetchData();
    },[id])
    

    return {movie, isLoading};
}

export default FetchMovieDetailsFromApi