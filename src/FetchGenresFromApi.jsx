import { useState,useEffect } from "react";
import MovieData from './FetchMoviesFromApi.jsx'


function FetchGenreData() {
    const [genres, setGenre] = useState([]);

    useEffect(()=> {
        genreData();
    },[])

    async function genreData() {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=a0b87e3161e78fd11ac65de503737085`
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