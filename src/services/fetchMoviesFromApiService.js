const movieapiurl = import.meta.env.VITE_MOVIE_API_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;

export async function fetchMoviesFromApi({
  pageParam = 1,
  genreId,
  query,
  category,
}) {
  let url;

  // Construct the API URL based on the provided parameters
  if (query && query.trim()) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${pageParam}`;
  } else if (genreId) {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${pageParam}&sort_by=popularity.desc`;
  } else {
    if (category === "top_rated") {
      url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${pageParam}`;
    } else if (category === "latest") {
      const today = new Date().toISOString().split("T")[0];
      const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${pageParam}&sort_by=release_date.desc&release_date.lte=${today}&release_date.gte=${sixMonthsAgo}`;
    } else {
      url = `${movieapiurl}&page=${pageParam}`;
    }
  }

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return {
    results: data.results || [],
    page: data.page,
    totalPages: data.total_pages,
  };
}
