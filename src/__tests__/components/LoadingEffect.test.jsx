import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingEffect from "../../components/animation/LoadingEffect";

vi.mock("react-loading-indicators", () => ({
  ThreeDot: ({ text, color, size }) => (
    <div data-testid="loading-indicator" data-color={color} data-size={size}>
      {text}
    </div>
  ),
}));

describe("LoadingEffect Component", () => {
  describe("rendering", () => {
    it("should render the loading indicator", () => {
      render(<LoadingEffect />);
      expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    });

    it("should display loading text", () => {
      render(<LoadingEffect />);
      expect(screen.getByText("Please wait...")).toBeInTheDocument();
    });

    it("should have correct styling props", () => {
      render(<LoadingEffect />);
      const indicator = screen.getByTestId("loading-indicator");
      expect(indicator).toHaveAttribute("data-color", "#ffffff");
      expect(indicator).toHaveAttribute("data-size", "large");
    });
  });

  describe("positioning", () => {
    it("should have fixed positioning styles", () => {
      const { container } = render(<LoadingEffect />);
      const wrapper = container.firstChild;

      expect(wrapper).toHaveStyle({ position: "fixed" });
    });
  });
});
