const movieBaseUrl = import.meta.env.VITE_MOVIE_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

export const fetchMovieDetails = async (id) => {
  const movieDetailsApiUrl = `${movieBaseUrl}/movie/${id}?api_key=${API_KEY}`;

  const res = await fetch(movieDetailsApiUrl, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Movie Details API failed with status ${res.status}`);
  }

  return res.json();
};

export const fetchMovieVideos = async (id) => {
  const movieVideosApiUrl = `${movieBaseUrl}/movie/${id}/videos?api_key=${API_KEY}`;

  const response = await fetch(movieVideosApiUrl);

  if (!response.ok) {
    throw new Error(`Movie Videos API failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
};
