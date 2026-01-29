import { Link } from "react-router-dom";
import styles from "../../css/movieCard.module.css";
import FavouriteButton from "../addToFavourite/FavouriteButton";
import genreData from "../../services/fetchGenresFromApiService";

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const placeholderImageUrl = import.meta.env.VITE_PLACEHOLDER_IMAGE_URL;

const MovieCard = ({ movie }) => {
  const imageBase = `${imageBaseUrl}w500`;
  //fetching the genredata from the api
  const { genres, genreNameIdMap } = genreData();

  return (
    <div className={styles.cardContainer}>
      <Link to={`/movies/${movie.id}/details`} state={{ genres }}>
        <div className={styles.movieCard}>
          <img
            src={
              movie.poster_path
                ? imageBase + movie.poster_path
                : placeholderImageUrl
            }
            alt={movie.title}
            className={styles.moviePoster}
          />

          <div className={styles.movieInfo}>
            <h3 className={styles.movieTitle}>{movie.title}</h3>

            <div className={styles.movieCategories}>
              {movie.genre_ids?.slice(0, 3).map((id) => (
                <span key={id} className={styles.categoryTag}>
                  {genreNameIdMap[id]}
                </span>
              ))}
            </div>

            <div className={styles.movieDetails}>
              <div className={styles.leftDetails}>
                <div className={styles.movieRating}>
                  <span className={styles.star}>⭐</span>
                  <span className={styles.ratingValue}>
                    {movie.vote_average}
                  </span>
                  <span className={styles.ratingCount}>
                    ({movie.vote_count})
                  </span>
                </div>

                <div className={styles.releaseDate}>
                  📅 {movie.release_date}
                </div>
              </div>

              <FavouriteButton movie={movie} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
