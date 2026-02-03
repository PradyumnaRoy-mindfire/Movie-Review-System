import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavouriteButton from "../../components/addToFavourite/FavouriteButton";

const mockToggleFavourite = vi.fn();
const mockIsFavourite = vi.fn();

vi.mock("../../customHooks/useFavourite", () => ({
  default: () => ({
    toggleFavourite: mockToggleFavourite,
    isFavourite: mockIsFavourite,
  }),
}));

vi.mock("../../customHooks/removeFromWatchLater", () => ({
  default: vi.fn(),
}));

describe("FavouriteButton Component", () => {
  const mockMovie = {
    id: 123,
    title: "Test Movie",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render unfilled heart when movie is not favourite", () => {
      mockIsFavourite.mockReturnValue(false);

      render(
        <MemoryRouter>
          <FavouriteButton movie={mockMovie} />
        </MemoryRouter>
      );

      expect(screen.getByText("🤍")).toBeInTheDocument();
    });

    it("should render filled heart when movie is favourite", () => {
      mockIsFavourite.mockReturnValue(true);

      render(
        <MemoryRouter>
          <FavouriteButton movie={mockMovie} />
        </MemoryRouter>
      );

      expect(screen.getByText("❤️")).toBeInTheDocument();
    });
  });

  describe("title attribute", () => {
    it("should show 'Add to favourites' when not favourited", () => {
      mockIsFavourite.mockReturnValue(false);

      render(
        <MemoryRouter>
          <FavouriteButton movie={mockMovie} />
        </MemoryRouter>
      );

      expect(screen.getByTitle("Add to favourites")).toBeInTheDocument();
    });

    it("should show 'Remove from favourites' when favourited", () => {
      mockIsFavourite.mockReturnValue(true);

      render(
        <MemoryRouter>
          <FavouriteButton movie={mockMovie} />
        </MemoryRouter>
      );

      expect(screen.getByTitle("Remove from favourites")).toBeInTheDocument();
    });
  });

  describe("user interaction", () => {
    it("should call toggleFavourite when clicked", () => {
      mockIsFavourite.mockReturnValue(false);

      render(
        <MemoryRouter>
          <FavouriteButton movie={mockMovie} />
        </MemoryRouter>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockToggleFavourite).toHaveBeenCalledWith(mockMovie);
    });

    it("should stop event propagation when clicked", () => {
      mockIsFavourite.mockReturnValue(false);
      const parentClickHandler = vi.fn();

      render(
        <MemoryRouter>
          <div onClick={parentClickHandler}>
            <FavouriteButton movie={mockMovie} />
          </div>
        </MemoryRouter>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(parentClickHandler).not.toHaveBeenCalled();
    });
  });

  describe("with hide callback", () => {
    it("should call hide callback when provided and movie is toggled", () => {
      mockIsFavourite.mockReturnValue(true);
      const mockHide = vi.fn();

      vi.useFakeTimers();

      render(
        <MemoryRouter>
          <FavouriteButton movie={mockMovie} hide={mockHide} />
        </MemoryRouter>
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      vi.advanceTimersByTime(10);

      expect(mockHide).toHaveBeenCalledWith(mockMovie);

      vi.useRealTimers();
    });
  });
});
