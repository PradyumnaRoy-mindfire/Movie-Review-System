import { useState,useEffect } from "react";
import MovieData from './FetchMoviesFromApi.jsx'
const genreApiUrl = import.meta.env.VITE_GENRE_URL


function FetchGenreData() {
    const [genres, setGenre] = useState([]);

    useEffect(()=> {
        genreData();
    },[])

    async function genreData() {
        const url = genreApiUrl
        let res = await fetch(url,{
            method:'GET'
        })
        res =  await res.json();
        setGenre(res.genres);
    }
    console.log(genres);

    return(
        <>
            <MovieData genres={genres}/>
        </>
    )
}

export default FetchGenreData;