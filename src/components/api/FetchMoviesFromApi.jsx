import { useState, useEffect } from "react";
import MovieCard from "../seeMovieDetails/MovieCard";
import LoadingEffect from '../animation/LoadingEffect';
import useLoading from '../../customHooks/useLoading';
import GenreFilter from '../searchAndFilteration/GenreFilter';
import SearchBar from '../searchAndFilteration/SearchBar';
import CategoryFilter from '../searchAndFilteration/CategoryFilter';

const movieapiurl = import.meta.env.VITE_MOVIE_API_URL;
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;

function FetchMovieFromApi() {
    const [moviesData, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('popular'); // popular, top_rated, latest
    const { isLoading, setIsLoading } = useLoading();

    useEffect(() => {
        setMovie([]);
        setPage(1);
        fetchData(1, selectedGenre, searchQuery, selectedCategory);
    }, [selectedGenre, searchQuery, selectedCategory]);

    useEffect(() => {
        if (page > 1) {
            fetchData(page, selectedGenre, searchQuery, selectedCategory);
        }
    }, [page]);

    async function fetchData(currentPage, genreId, query, category) {
        setIsLoading(true);
        
        let url;
        
        if (query.trim()) {
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${currentPage}`;
        } else if (genreId) {
            url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${currentPage}&sort_by=popularity.desc`;
        } else {
            if (category === 'top_rated') {
                url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${currentPage}`;
            } else if (category === 'latest') {
                const today = new Date().toISOString().split('T')[0];
                const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}&sort_by=release_date.desc&release_date.lte=${today}&release_date.gte=${sixMonthsAgo}`;
            } else {
                url = `${movieapiurl}&page=${currentPage}`;
            }
        }

        try {
            let response = await fetch(url, {
                method: 'GET'
            });
            response = await response.json();
            
            if (currentPage === 1) {
                setMovie(response.results || []);
            } else {
                setMovie(prev => [...prev, ...(response.results || [])]);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
        
        setIsLoading(false);
    }

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
            if (bottom && !isLoading) {
                setPage(prev => prev + 1);
            }
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading]);

    const handleGenreChange = (genreId) => {
        setSelectedGenre(genreId);
        setSearchQuery(''); // Clear search when selecting genre
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setSelectedGenre(null); // Clear genre when searching
        setSelectedCategory('popular'); // Reset category when searching
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchQuery(''); // Clear search when changing category
        setSelectedGenre(null); // Clear genre when changing category
    };

    return (
        <>
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
            
            {moviesData && moviesData.map((movie, index) => (
                <MovieCard 
                    movie={movie} 
                    key={`${movie.id}-${index}`} 
                />
            ))}
            
            {isLoading && (
                <LoadingEffect />
            )}
            
            {!isLoading && moviesData.length === 0 && (
                <div className="w-full flex justify-center items-center py-12 text-gray-400">
                    <p className="text-xl">No movies found</p>
                </div>
            )}
        </>
    );
}

export default FetchMovieFromApi;