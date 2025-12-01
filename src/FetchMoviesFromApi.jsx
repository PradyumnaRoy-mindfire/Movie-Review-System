import { useState, useEffect ,useRef } from "react";
import MovieCard from "./MovieCard";
function FetchMovieFromApi({genres}) {
    const [moviesData , setMovie] = useState([]);
    const [page , setPage] = useState(1);
    const [favourites, setFavourites] = useState([]);
    const isFirstRender = useRef(true); 

        //on mount
    useEffect(() => {
        const storedFavourites = localStorage.getItem('movieFavourites');
        if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites));
        }
    }, []);

        //whenever we chnage toggle favourite button 
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // After first render, set to false
            return; // Skip saving on first render
        }
        localStorage.setItem('movieFavourites', JSON.stringify(favourites));
    }, [favourites]);
    

    function toggleFavourite(movie) {
        const isFav = favourites.some(fav => (fav.id === movie.id))
        if(isFav) {
            setFavourites(favourites.filter(fav => fav.id !== movie.id));
        }
        else {
            setFavourites(prev => [...prev, movie]);
        }
    }

    const isFavourite = (movie) => {
        return favourites.some(fav => fav.id === movie.id);
    }


    useEffect(()=> {
        fetchData();
    },[page]);

    async function fetchData () {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=a0b87e3161e78fd11ac65de503737085&page=${page}`;
        let response = await fetch(url, {
            method: 'GET'
        });
        response = await response.json()
        setMovie(prev =>[...prev,...response.results])
    }
    console.log(moviesData);
    return (
        <>
        <h1>Showing Movie Data</h1>
        <div className="container">
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