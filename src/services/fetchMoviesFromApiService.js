import { logError } from "../utils/errorLogger";

const movieapiurl = import.meta.env.VITE_MOVIE_API_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;

export async function fetchMoviesFromApi(
  currentPage,
  genreId,
  query,
  category,
) {
  let url;

  if (query.trim()) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}&page=${currentPage}`;
  } else if (genreId) {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${currentPage}&sort_by=popularity.desc`;
  } else {
    if (category === "top_rated") {
      url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${currentPage}`;
    } else if (category === "latest") {
      const today = new Date().toISOString().split("T")[0];
      const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}&sort_by=release_date.desc&release_date.lte=${today}&release_date.gte=${sixMonthsAgo}`;
    } else {
      url = `${movieapiurl}&page=${currentPage}`;
    }
  }

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    logError(error, ":Error fetching movies");
    return [];
  }
}
