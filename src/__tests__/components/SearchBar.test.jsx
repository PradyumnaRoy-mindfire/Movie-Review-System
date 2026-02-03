import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/searchAndFilteration/SearchBar";

describe("SearchBar Component", () => {
  const mockOnSearchChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("rendering", () => {
    it("should render the search input", () => {
      render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);

      expect(
        screen.getByPlaceholderText("Search for movies...")
      ).toBeInTheDocument();
    });

    it("should render with initial search query value", () => {
      render(
        <SearchBar
          searchQuery="test query"
          onSearchChange={mockOnSearchChange}
        />
      );

      expect(screen.getByDisplayValue("test query")).toBeInTheDocument();
    });

    it("should render the search icon", () => {
      const { container } = render(
        <SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />
      );

      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("user interaction", () => {
    it("should update input value when user types", async () => {
      render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText("Search for movies...");
      fireEvent.change(input, { target: { value: "Batman" } });

      expect(input).toHaveValue("Batman");
    });

    it("should debounce search callback", async () => {
      render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText("Search for movies...");
      fireEvent.change(input, { target: { value: "Batman" } });

      // Should not call immediately
      expect(mockOnSearchChange).not.toHaveBeenCalled();

      // Fast-forward timers
      vi.advanceTimersByTime(500);

      // Should call after debounce delay
      expect(mockOnSearchChange).toHaveBeenCalledWith("Batman");
    });

    it("should only call callback once after multiple rapid inputs", () => {
      render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText("Search for movies...");

      // Rapid typing
      fireEvent.change(input, { target: { value: "B" } });
      vi.advanceTimersByTime(100);
      fireEvent.change(input, { target: { value: "Ba" } });
      vi.advanceTimersByTime(100);
      fireEvent.change(input, { target: { value: "Bat" } });
      vi.advanceTimersByTime(100);
      fireEvent.change(input, { target: { value: "Batm" } });
      vi.advanceTimersByTime(100);
      fireEvent.change(input, { target: { value: "Batman" } });

      // Wait for debounce
      vi.advanceTimersByTime(500);

      // Should only be called once with final value
      expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
      expect(mockOnSearchChange).toHaveBeenCalledWith("Batman");
    });
  });

  describe("accessibility", () => {
    it("should have proper input type", () => {
      render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);

      const input = screen.getByPlaceholderText("Search for movies...");
      expect(input).toHaveAttribute("type", "text");
    });
  });
});
