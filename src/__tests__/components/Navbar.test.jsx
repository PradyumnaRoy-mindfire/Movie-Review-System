import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";

vi.mock("../../components/animation/TextType", () => ({
  default: ({ text }) => <span data-testid="logo-text">{text[0]}</span>,
}));

describe("Navbar Component", () => {
  const renderNavbar = (initialRoute = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navbar />
      </MemoryRouter>
    );
  };

  describe("rendering", () => {
    it("should render the navbar", () => {
      renderNavbar();
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("should render the logo", () => {
      renderNavbar();
      expect(screen.getByTestId("logo-text")).toBeInTheDocument();
      expect(screen.getByTestId("logo-text")).toHaveTextContent("CineFLIX");
    });

    it("should render all navigation links", () => {
      renderNavbar();

      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /favourites/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /about us/i })
      ).toBeInTheDocument();
    });
  });

  describe("navigation links", () => {
    it("should have correct href for Home link", () => {
      renderNavbar();
      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("should have correct href for Favourites link", () => {
      renderNavbar();
      const favouritesLink = screen.getByRole("link", { name: /favourites/i });
      expect(favouritesLink).toHaveAttribute("href", "/favourites");
    });

    it("should have correct href for About Us link", () => {
      renderNavbar();
      const aboutLink = screen.getByRole("link", { name: /about us/i });
      expect(aboutLink).toHaveAttribute("href", "/about-us");
    });
  });

  describe("active state", () => {
    it("should highlight Home link when on home page", () => {
      renderNavbar("/");
      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink.className).toContain("active");
    });

    it("should highlight Favourites link when on favourites page", () => {
      renderNavbar("/favourites");
      const favouritesLink = screen.getByRole("link", { name: /favourites/i });
      expect(favouritesLink.className).toContain("active");
    });

    it("should highlight About Us link when on about page", () => {
      renderNavbar("/about-us");
      const aboutLink = screen.getByRole("link", { name: /about us/i });
      expect(aboutLink.className).toContain("active");
    });
  });
});
