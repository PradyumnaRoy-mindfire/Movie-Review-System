import styles from '../css/movieCard.module.css';
import  useFavourites  from '../customHooks/useFavourite.jsx';
import removeFromWatchLater from '../customHooks/removeFromWatchLater.jsx';

const FavouriteButton = ({movie,hide}) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  return (
   <button
        className={`${styles.favouriteBtn} ${
            isFavourite(movie) ? styles.active : ""
        }`}
        onClick={(e) => {
            e.stopPropagation();  //stops the event from moving upward in the DOM tree
            e.preventDefault();
            toggleFavourite(movie);
            
            if(hide){
                removeFromWatchLater(movie);
                setTimeout(() => {
                    hide(movie);
                }, 1);
            }
        }}
        title={
            isFavourite(movie)
            ? "Remove from favourites"
            : "Add to favourites"
        }
        >
        {isFavourite(movie) ? "❤️" : "🤍"}
    </button>
  )
}

export default FavouriteButton;