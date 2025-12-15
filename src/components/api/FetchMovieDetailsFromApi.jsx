import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY 

const FetchMovieDetailsFromApi = (id) => {
    const movieDetailsApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function fetchData () {
            let response = await fetch(movieDetailsApiUrl, {
                method: 'GET'
            });
            response = await response.json();
            setMovie(response);
            setLoading(false);
        }
        fetchData();
    },[id])

    return {movie};
}

export default FetchMovieDetailsFromApi