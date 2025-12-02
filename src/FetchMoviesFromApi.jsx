import { useState, useEffect ,useRef } from "react";
import MovieCard from "./MovieCard";
import useFavourites  from "./customHooks/useFavourite";
import Header from './Header';

const movieapiurl = import.meta.env.VITE_MOVIE_API_URL

function FetchMovieFromApi({genres}) {
    const [moviesData , setMovie] = useState([]);
    const [page , setPage] = useState(1);
    const { favourites, toggleFavourite, isFavourite } = useFavourites();


    useEffect(()=> {
        fetchData();
    },[page]);

    async function fetchData () {
        const url = `${movieapiurl}&page=${page}`;
        let response = await fetch(url, {
            method: 'GET'
        });
        response = await response.json()
        setMovie(prev =>[...prev,...response.results])
    }
    console.log(moviesData);
    return (
        <>
        <div className="container">
            <Header/>
            {moviesData && moviesData.map((movie)=> (
                <MovieCard movie={movie} key={Date.now()+''+Math.random()} genres={genres} isFavourite={isFavourite} toggleFavourite={toggleFavourite}/>
            ))
            }
        </div>
        <button onClick={()=> setPage(page+1)}> Load More</button>
        </>
    )
    


}

export default FetchMovieFromApi;