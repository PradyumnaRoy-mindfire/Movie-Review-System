import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "../../components/searchAndFilteration/CategoryFilter";

describe("CategoryFilter Component", () => {
  const mockOnCategoryChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render the filter title", () => {
      render(
        <CategoryFilter
          selectedCategory="popular"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      expect(screen.getByText("Filter by Categories")).toBeInTheDocument();
    });

    it("should render all category buttons", () => {
      render(
        <CategoryFilter
          selectedCategory="popular"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      expect(screen.getByText("Popular")).toBeInTheDocument();
      expect(screen.getByText("Top Rated")).toBeInTheDocument();
      expect(screen.getByText("Latest")).toBeInTheDocument();
    });

    it("should render category icons", () => {
      render(
        <CategoryFilter
          selectedCategory="popular"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      expect(screen.getByText("🔥")).toBeInTheDocument();
      expect(screen.getByText("⭐")).toBeInTheDocument();
      expect(screen.getByText("🆕")).toBeInTheDocument();
    });
  });

  describe("selection state", () => {
    it("should highlight the selected category", () => {
      render(
        <CategoryFilter
          selectedCategory="popular"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      const popularButton = screen.getByText("Popular").closest("button");
      expect(popularButton?.className).toContain("from-blue-500");
    });

    it("should highlight top_rated when selected", () => {
      render(
        <CategoryFilter
          selectedCategory="top_rated"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      const topRatedButton = screen.getByText("Top Rated").closest("button");
      expect(topRatedButton?.className).toContain("from-blue-500");
    });

    it("should highlight latest when selected", () => {
      render(
        <CategoryFilter
          selectedCategory="latest"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      const latestButton = screen.getByText("Latest").closest("button");
      expect(latestButton?.className).toContain("from-blue-500");
    });
  });

  describe("user interaction", () => {
    it("should call onCategoryChange when clicking Popular", () => {
      render(
        <CategoryFilter
          selectedCategory="top_rated"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      const popularButton = screen.getByText("Popular").closest("button");
      fireEvent.click(popularButton);

      expect(mockOnCategoryChange).toHaveBeenCalledWith("popular");
    });

    it("should call onCategoryChange when clicking Top Rated", () => {
      render(
        <CategoryFilter
          selectedCategory="popular"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      const topRatedButton = screen.getByText("Top Rated").closest("button");
      fireEvent.click(topRatedButton);

      expect(mockOnCategoryChange).toHaveBeenCalledWith("top_rated");
    });

    it("should call onCategoryChange when clicking Latest", () => {
      render(
        <CategoryFilter
          selectedCategory="popular"
          onCategoryChange={mockOnCategoryChange}
        />
      );

      const latestButton = screen.getByText("Latest").closest("button");
      fireEvent.click(latestButton);

      expect(mockOnCategoryChange).toHaveBeenCalledWith("latest");
    });
  });
});
