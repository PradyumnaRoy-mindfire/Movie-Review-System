import { useState, useEffect ,useRef } from "react";
import MovieCard from "../MovieCard";
import useFavourites  from "../../customHooks/UseFavourite";
import Header from '../Header';
import LoadingEffect from '../animation/LoadingEffect';

const movieapiurl = import.meta.env.VITE_MOVIE_API_URL

function FetchMovieFromApi({genres}) {
    const [moviesData , setMovie] = useState([]);
    const [page , setPage] = useState(1);
    const { favourites, toggleFavourite, isFavourite } = useFavourites();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=> {
        fetchData();
    },[page]);

    async function fetchData () {
        setIsLoading(true);
        const url = `${movieapiurl}&page=${page}`;
        let response = await fetch(url, {
            method: 'GET'
        });
        response = await response.json()
        setMovie(prev =>[...prev,...response.results])
        setIsLoading(false); 
    }

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
            
            if (bottom && !isLoading) {
                setIsLoading(true);
                setTimeout(() => {
                    setPage(prev => prev + 1);  
                    setIsLoading(false); 
                }, 2500);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading]); 

    console.log(moviesData);
    return (
        <>
        <div style={{
            background: 'linear-gradient(to bottom right, #111827, #581c87, #111827)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            <Header/>
            {moviesData && moviesData.map((movie)=> (
                <MovieCard movie={movie} key={Date.now()+''+Math.random()} genres={genres} isFavourite={isFavourite} toggleFavourite={toggleFavourite}/>
            ))
            }
        </div>

        {isLoading && (
            <LoadingEffect/>
        )}
        </>
    )
    


}

export default FetchMovieFromApi;