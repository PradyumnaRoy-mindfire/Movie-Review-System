import { Link } from 'react-router-dom';
import styles from '../css/movieCard.module.css';

const MovieCard = ({ movie, genres, isFavourite, toggleFavourite}) => {
    const imageBase = "https://image.tmdb.org/t/p/w500";
  

    const genreMap = Object.fromEntries(
        genres.map(g => [g.id, g.name])
    );

    return (
    <div className={styles.cardContainer}>
        <Link to={`/movies/${movie.id}/details`} state={{genres}}>
            <div className={styles.movieCard}>
                <img
                src={imageBase + movie.poster_path}
                alt={movie.title}
                className={styles.moviePoster}
                />

                <div className={styles.movieInfo}>
                    <h3 className={styles.movieTitle}>{movie.title}</h3>

                    <div className={styles.movieCategories}>
                        {movie.genre_ids.slice(0, 3).map((id) => (
                        <span key={id} className={styles.categoryTag}>
                            {genreMap[id]}
                        </span>
                        ))}
                    </div>

                    <div className={styles.movieDetails}>
                        <div className={styles.leftDetails}>
                            <div className={styles.movieRating}>
                                <span className={styles.star}>⭐</span>
                                <span className={styles.ratingValue}>{movie.vote_average}</span>
                                <span className={styles.ratingCount}>({movie.vote_count})</span>
                            </div>

                            <div className={styles.releaseDate}>
                                📅 {movie.release_date}
                            </div>
                        </div>

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
                    </div>
                </div>
            </div>
        </Link>
    </div>

    );  
    };

export default MovieCard;
