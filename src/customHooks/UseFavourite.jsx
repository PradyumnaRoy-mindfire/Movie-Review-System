import { calcGeneratorDuration } from "motion";
import { useState,useEffect ,useRef } from "react";
import toast from 'react-hot-toast';

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
            showRemoveFromFavouriteToast(movie.title); 
        }
        else {
            showAddToFavouriteToast(movie.title);
            setFavourites(prev => [...prev, movie]);
        }
    }

    const showAddToFavouriteToast = (title) => {
        toast.success(
            <span>
                <span className="font-bold">{title}</span> added to your favourites
            </span>,
            {
                duration: 3000,
            }
        );
    };

    const showRemoveFromFavouriteToast = (title) => {
        toast.error(
            <span>
                <span className="font-bold">{title}</span> removed from your favourites
            </span>,
            {
                duration: 3000,
            }
        );
    };

    const isFavourite = (movie) => {
        return favourites.some(fav => fav.id === movie.id);
    }

    return {favourites, toggleFavourite, isFavourite}
}

export default useFavourite