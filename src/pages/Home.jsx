import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import MovieCard from "../components/seeMovieDetails/MovieCard";
import LoadingEffect from "../components/animation/LoadingEffect";
import useLoading from "../customHooks/useLoading.js";
import GenreFilter from "../components/searchAndFilteration/GenreFilter";
import SearchBar from "../components/searchAndFilteration/SearchBar";
import CategoryFilter from "../components/searchAndFilteration/CategoryFilter";
import { logError } from "../utils/errorLogger";
import { fetchMoviesFromApi } from "../services/fetchMoviesFromApiService";

const Home = () => {
  const [moviesData, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const { isLoading, setIsLoading } = useLoading();

  const fetchData = useCallback(
    async (currentPage, genreId, query, category) => {
      setIsLoading(true);

      try {
        const movies = await fetchMoviesFromApi(
          currentPage,
          genreId,
          query,
          category,
        );

        if (currentPage === 1) {
          setMovie(movies);
        } else {
          setMovie((prev) => [...prev, ...movies]);
        }
      } catch (error) {
        logError(error, ":Error fetching movies");
        if (currentPage === 1) {
          setMovie([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );

  useEffect(() => {
    setMovie([]);
    setPage(1);
    fetchData(1, selectedGenre, searchQuery, selectedCategory);
  }, [selectedGenre, searchQuery, selectedCategory, fetchData]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page, selectedGenre, searchQuery, selectedCategory);
    }
  }, [page, fetchData, selectedGenre, searchQuery, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (bottom && !isLoading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setSearchQuery("");
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setSelectedCategory("popular");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setSelectedGenre(null);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-700 via-purple-900 to-gray-700 flex flex-wrap justify-center items-center">
        <Header />

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />

        {moviesData &&
          moviesData.map((movie, index) => (
            <MovieCard movie={movie} key={`${movie.id}-${index}`} />
          ))}

        {isLoading && <LoadingEffect />}

        {!isLoading && moviesData.length === 0 && (
          <div className="w-full flex justify-center items-center py-12 text-gray-400">
            <p className="text-xl">No movies found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
