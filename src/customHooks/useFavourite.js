import { useState, useCallback } from "react";
import { logError } from "../utils/errorLogger";
import toastNotification from "../utils/toastNotifications";

const useFavourite = () => {
  const { showAddToFavouriteToast, showRemoveFromFavouriteToast } =
    toastNotification;

  // Initialize favourites state from localStorage or as an empty array.
  const [favourites, setFavourites] = useState(() => {
    try {
      const storedFavourites = localStorage.getItem("movieFavourites");
      return storedFavourites ? JSON.parse(storedFavourites) : [];
    } catch (error) {
      logError(error, ":Error loading favourites");
      return [];
    }
  });

  // Toggles the favourite status of a movie.
  // If the movie is already a favourite, it removes it; otherwise, it adds it.
  // Updates both the local state and localStorage accordingly.
  const toggleFavourite = useCallback(
    (movie) => {
      setFavourites((currentFavourites) => {
        let latestFavourites;
        try {
          const stored = localStorage.getItem("movieFavourites");
          latestFavourites = stored ? JSON.parse(stored) : [];
        } catch (error) {
          latestFavourites = currentFavourites;
        }

        const isFav = latestFavourites.some((fav) => fav.id === movie.id);

        let updatedFavourites;
        if (isFav) {
          updatedFavourites = latestFavourites.filter(
            (fav) => fav.id !== movie.id
          );
          showRemoveFromFavouriteToast(movie.title);
        } else {
          updatedFavourites = [...latestFavourites, movie];
          showAddToFavouriteToast(movie.title);
        }

        try {
          localStorage.setItem(
            "movieFavourites",
            JSON.stringify(updatedFavourites)
          );
        } catch (error) {
          logError(error, ":Error saving favourites");
        }

        return updatedFavourites;
      });
    },
    [showAddToFavouriteToast, showRemoveFromFavouriteToast]
  );

  // Checks if a given movie is in the favourites list by comparing movie IDs.
  // Returns true if the movie is found in the current favourites state.
  const isFavourite = useCallback(
    (movie) => {
      return favourites.some((fav) => fav.id === movie.id);
    },
    [favourites]
  );

  return { favourites, toggleFavourite, isFavourite };
};

export default useFavourite;
