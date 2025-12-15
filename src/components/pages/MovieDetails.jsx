import { useParams } from "react-router-dom";
import LoadingEffect from "../animation/LoadingEffect";
import FetchMovieDetailsFromApi from "../api/FetchMovieDetailsFromApi";
import FetchMovieVideosFromApi from "../api/FetchMovieVideosFromApi";
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY 


const MovieDetails = () => {
    //the name ':id' must be same as the fetching variable with userParams
  const { id } = useParams();
  
  const {movie} = FetchMovieDetailsFromApi(id);
  const {videos} = FetchMovieVideosFromApi(id);
 
    console.log(movie);
    console.log(videos[0]);

  return (
      <div>MovieDetails
       
    {/* {isLoading && 
        (
            <LoadingEffect/>
        )
    } */}
    </div>
  )
}

export default MovieDetails