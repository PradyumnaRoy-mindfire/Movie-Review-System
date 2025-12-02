import { useState,useEffect ,useRef } from "react";

function useFavourite() {
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
        //this ref use effect is used because the favourite state is initially set to an empty array, and this useEffect runs first, so the empty array is saved to local storage,and previous data will be lost, that's why we use isFirstRender to skipp saving on first render
        if (isFirstRender.current) {
            isFirstRender.current = false; 
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

    return {favourites, toggleFavourite, isFavourite}
}

export default useFavourite