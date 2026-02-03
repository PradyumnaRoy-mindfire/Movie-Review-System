const removeFromWatchLater = (movie) => {
  // remove the watchleter movie from localStorage
  let storedWatchLater =
    JSON.parse(localStorage.getItem("watchLaterMovies")) || [];

  const isWatch = storedWatchLater.some((watch) => watch.id === movie.id);

  if (isWatch) {
    storedWatchLater = storedWatchLater.filter(
      (watch) => watch.id !== movie.id
    );

    localStorage.setItem("watchLaterMovies", JSON.stringify(storedWatchLater));
  }
};

export default removeFromWatchLater;
