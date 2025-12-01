import React, { useState } from "react";
import './css/movieCard.css'

const MovieCard = ({ movie, genres, isFavourite, toggleFavourite}) => {
    const imageBase = "https://image.tmdb.org/t/p/w500";
  

    const genreMap = Object.fromEntries(
        genres.map(g => [g.id, g.name])
    );

    return (
        <div className="card-container">
        <div className="movie-card">
            <img
            src={imageBase + movie.poster_path}
            alt={movie.title}
            className="movie-poster"
            />
            <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            
            
            <div className="movie-categories">
                {movie.genre_ids.slice(0, 3).map((id) => (
                <span key={id} className="category-tag">
                    {genreMap[id]}
                </span>
                ))}
            </div>

            <div className="movie-details">
                    <div className="left-details">
                        <div className="movie-rating">
                        <span className="star">⭐</span>
                        <span className="rating-value">{movie.vote_average}</span>
                        <span className="rating-count">({movie.vote_count})</span>
                        </div>
                    
                        <div className="release-date">
                        📅 {movie.release_date}
                        </div>
                    </div>
                    <button 
                        className={`favourite-btn ${isFavourite(movie) ? 'active' : ''}`}
                        onClick={()=>toggleFavourite(movie)}
                        title={isFavourite(movie) ? "Remove from favourites" : "Add to favourites"}
                        >
                        {isFavourite(movie) ? '❤️' : '🤍'}
                        </button>
                </div>
            </div>
        </div>
        </div>
    );
    };

export default MovieCard;
