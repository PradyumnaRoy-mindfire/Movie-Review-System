import { useState, useEffect, useCallback } from "react";
import toast from 'react-hot-toast';

function useFavourite() {
    const [favourites, setFavourites] = useState(() => {
        try {
            const storedFavourites = localStorage.getItem('movieFavourites');
            return storedFavourites ? JSON.parse(storedFavourites) : [];
        } catch (error) {
            console.error('Error loading favourites:', error);
            return [];
        }
    });
    
    const toggleFavourite = useCallback((movie) => {
        setFavourites(currentFavourites => {
            let latestFavourites;
            try {
                const stored = localStorage.getItem('movieFavourites');
                latestFavourites = stored ? JSON.parse(stored) : [];
            } catch (error) {
                latestFavourites = currentFavourites;
            }
            
            const isFav = latestFavourites.some(fav => fav.id === movie.id);
            
            let updatedFavourites;
            if (isFav) {
                updatedFavourites = latestFavourites.filter(fav => fav.id !== movie.id);
                showRemoveFromFavouriteToast(movie.title);
            } else {
                updatedFavourites = [...latestFavourites, movie];
                showAddToFavouriteToast(movie.title);
            }
            
            try {
                localStorage.setItem('movieFavourites', JSON.stringify(updatedFavourites));
            } catch (error) {
                console.error('Error saving favourites:', error);
            }
            
            return updatedFavourites;
        });
    }, []);
    
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
    
    const isFavourite = useCallback((movie) => {
        return favourites.some(fav => fav.id === movie.id);
    }, [favourites]);
    
    return { favourites, toggleFavourite, isFavourite }
}

export default useFavourite;