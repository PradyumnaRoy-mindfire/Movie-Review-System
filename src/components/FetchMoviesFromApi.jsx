import { useState, useEffect ,useRef } from "react";
import MovieCard from "./MovieCard";
import useFavourites  from "../customHooks/UseFavourite";
import Header from './Header';

const movieapiurl = import.meta.env.VITE_MOVIE_API_URL

function FetchMovieFromApi({genres}) {
    const [moviesData , setMovie] = useState([]);
    const [page , setPage] = useState(1);
    const { favourites, toggleFavourite, isFavourite } = useFavourites();
    let isLoading = false;
    
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
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

        if (bottom) {
            isLoading = true;
            setPage(page => page+1);

            setTimeout(()=> {
                isLoading = false;
            },500)
        }
    };
    console.log(moviesData);
    return (
        <>
        <div className="main-content ">
            <Header/>
            {moviesData && moviesData.map((movie)=> (
                <MovieCard movie={movie} key={Date.now()+''+Math.random()} genres={genres} isFavourite={isFavourite} toggleFavourite={toggleFavourite}/>
            ))
            }
        </div>
        {/* <button onClick={()=> setPage(page+1)}> Load More</button> */}
        </>
    )
    


}

export default FetchMovieFromApi;