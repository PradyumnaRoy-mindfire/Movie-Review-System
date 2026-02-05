const genreApiUrl = import.meta.env.VITE_GENRE_URL;

export const fetchGenres = async () => {
  const res = await fetch(genreApiUrl, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Genre API failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.genres || [];
};
