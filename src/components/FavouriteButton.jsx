import styles from '../css/movieCard.module.css';
import  useFavourites  from '../customHooks/useFavourite.jsx';

const FavouriteButton = ({movie}) => {
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