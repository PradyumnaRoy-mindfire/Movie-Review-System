import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

export const renderWithProviders = (
  ui,
  { queryClient = createTestQueryClient(), route = "/", ...options } = {}
) => {
  window.history.pushState({}, "Test page", route);

  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient,
  };
};

export const mockMovie = {
  id: 123,
  title: "Test Movie",
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  vote_average: 8.5,
  vote_count: 1000,
  release_date: "2025-01-15",
  overview: "This is a test movie description.",
  genre_ids: [28, 12, 878],
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 878, name: "Science Fiction" },
  ],
  runtime: 120,
  budget: 100000000,
  revenue: 500000000,
  tagline: "A test tagline",
  homepage: "https://example.com",
  imdb_id: "tt1234567",
};

export const mockMovies = [
  mockMovie,
  {
    id: 456,
    title: "Another Test Movie",
    poster_path: "/another-poster.jpg",
    vote_average: 7.2,
    vote_count: 500,
    release_date: "2024-06-20",
    genre_ids: [35, 10749],
  },
  {
    id: 789,
    title: "Third Test Movie",
    poster_path: null,
    vote_average: 6.8,
    vote_count: 250,
    release_date: "2024-03-10",
    genre_ids: [27, 53],
  },
];

export const mockGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 878, name: "Science Fiction" },
  { id: 35, name: "Comedy" },
  { id: 10749, name: "Romance" },
  { id: 27, name: "Horror" },
  { id: 53, name: "Thriller" },
];

export const waitForAsync = () =>
  new Promise((resolve) => setTimeout(resolve, 0));
