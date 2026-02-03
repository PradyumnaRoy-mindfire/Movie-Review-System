import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useFavourite from "../../customHooks/useFavourite";

vi.mock("../../utils/toastNotifications", () => ({
  default: {
    showAddToFavouriteToast: vi.fn(),
    showRemoveFromFavouriteToast: vi.fn(),
  },
}));

vi.mock("../../utils/errorLogger", () => ({
  logError: vi.fn(),
}));

describe("useFavourite Hook", () => {
  const mockMovie = {
    id: 123,
    title: "Test Movie",
    poster_path: "/test.jpg",
  };

  const mockMovie2 = {
    id: 456,
    title: "Another Movie",
    poster_path: "/another.jpg",
  };

  beforeEach(() => {
    localStorage.getItem.mockReturnValue(null);
    localStorage.setItem.mockClear();
  });

  describe("initialization", () => {
    it("should initialize with empty favourites when localStorage is empty", () => {
      localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useFavourite());

      expect(result.current.favourites).toEqual([]);
    });

    it("should initialize with favourites from localStorage", () => {
      const storedFavourites = [mockMovie];
      localStorage.getItem.mockReturnValue(JSON.stringify(storedFavourites));

      const { result } = renderHook(() => useFavourite());

      expect(result.current.favourites).toEqual(storedFavourites);
    });

    it("should handle corrupted localStorage data gracefully", () => {
      localStorage.getItem.mockReturnValue("invalid-json");

      const { result } = renderHook(() => useFavourite());

      expect(result.current.favourites).toEqual([]);
    });
  });

  describe("isFavourite", () => {
    it("should return true for a movie in favourites", () => {
      localStorage.getItem.mockReturnValue(JSON.stringify([mockMovie]));

      const { result } = renderHook(() => useFavourite());

      expect(result.current.isFavourite(mockMovie)).toBe(true);
    });

    it("should return false for a movie not in favourites", () => {
      localStorage.getItem.mockReturnValue(JSON.stringify([mockMovie]));

      const { result } = renderHook(() => useFavourite());

      expect(result.current.isFavourite(mockMovie2)).toBe(false);
    });

    it("should return false when favourites is empty", () => {
      localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useFavourite());

      expect(result.current.isFavourite(mockMovie)).toBe(false);
    });
  });

  describe("toggleFavourite", () => {
    it("should add a movie to favourites when not already favourited", () => {
      localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useFavourite());

      act(() => {
        result.current.toggleFavourite(mockMovie);
      });

      expect(result.current.favourites).toContainEqual(mockMovie);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "movieFavourites",
        JSON.stringify([mockMovie])
      );
    });

    it("should remove a movie from favourites when already favourited", () => {
      localStorage.getItem.mockReturnValue(JSON.stringify([mockMovie]));

      const { result } = renderHook(() => useFavourite());

      act(() => {
        result.current.toggleFavourite(mockMovie);
      });

      expect(result.current.favourites).not.toContainEqual(mockMovie);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "movieFavourites",
        JSON.stringify([])
      );
    });

    it("should handle multiple movies correctly", () => {
      localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useFavourite());

      // Add first movie
      act(() => {
        result.current.toggleFavourite(mockMovie);
      });

      // Mock localStorage to return current state for next toggle
      localStorage.getItem.mockReturnValue(JSON.stringify([mockMovie]));

      // Add second movie
      act(() => {
        result.current.toggleFavourite(mockMovie2);
      });

      expect(result.current.favourites).toHaveLength(2);
      expect(result.current.isFavourite(mockMovie)).toBe(true);
      expect(result.current.isFavourite(mockMovie2)).toBe(true);
    });
  });

  describe("persistence", () => {
    it("should save to localStorage when adding favourite", () => {
      localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useFavourite());

      act(() => {
        result.current.toggleFavourite(mockMovie);
      });

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "movieFavourites",
        expect.any(String)
      );
    });

    it("should save to localStorage when removing favourite", () => {
      localStorage.getItem.mockReturnValue(JSON.stringify([mockMovie]));

      const { result } = renderHook(() => useFavourite());

      act(() => {
        result.current.toggleFavourite(mockMovie);
      });

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});
