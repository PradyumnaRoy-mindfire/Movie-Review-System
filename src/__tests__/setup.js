import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock import.meta.env
vi.stubGlobal("import.meta", {
  env: {
    VITE_IMAGE_BASE_URL: "https://image.tmdb.org/t/p/",
    VITE_PLACEHOLDER_IMAGE_URL: "https://via.placeholder.com/500x750",
    VITE_MOVIE_API_URL: "https://api.themoviedb.org/3",
    VITE_MOVIE_API_KEY: "test-api-key",
    VITE_MOVIE_BASE_URL: "https://api.themoviedb.org/3",
    VITE_GENRE_URL: "https://api.themoviedb.org/3/genre/movie/list",
    VITE_IMDB_BASE_URL: "https://www.imdb.com/title/",
  },
});

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.getItem.mockReturnValue(null);
});
