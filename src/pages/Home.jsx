import { useState, useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import MovieCard from "../components/seeMovieDetails/MovieCard";
import LoadingEffect from "../components/animation/LoadingEffect";
import GenreFilter from "../components/searchAndFilteration/GenreFilter";
import SearchBar from "../components/searchAndFilteration/SearchBar";
import CategoryFilter from "../components/searchAndFilteration/CategoryFilter";
import { logError } from "../utils/errorLogger";
import { fetchMoviesFromApi } from "../services/fetchMoviesFromApiService";

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["movies", selectedGenre, searchQuery, selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      fetchMoviesFromApi({
        pageParam,
        genreId: selectedGenre,
        query: searchQuery,
        category: selectedCategory,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into a single movies array
  const moviesData = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  const isLoading = isFetching && !isFetchingNextPage;

  if (error) {
    logError(error, ":Error fetching movies");
  }

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetching]);

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
        {/* Search Section */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        {/* Category wise filters Section */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        {/* Genre wise filters Section */}
        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />

        {/* Movies Section */}
        {moviesData &&
          moviesData.map((movie, index) => (
            <MovieCard movie={movie} key={`${movie.id}-${index}`} />
          ))}

        {(isLoading || isFetchingNextPage) && <LoadingEffect />}

        {!isFetching && moviesData.length === 0 && (
          <div className="w-full flex justify-center items-center py-12 text-gray-400">
            <p className="text-xl">No movies found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
