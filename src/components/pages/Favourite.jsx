import React from 'react'
import useFavourite from '../../customHooks/UseFavourite'
import MovieCard from '../MovieCard';
const Favourite = () => {
    const{favourites, toggleFavourite, isFavourite}=useFavourite();
    console.log(favourites);
  return (
    <div>
        <div>hello</div>
        {
            favourites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} isFavourite={isFavourite} toggleFavourite={toggleFavourite}/>
            ))
        }
    </div>
  )
}

export default Favourite