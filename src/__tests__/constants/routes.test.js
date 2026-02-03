import { describe, it, expect } from "vitest";
import { ROUTES } from "../../constants/routes";

describe("Routes Constants", () => {
  describe("route definitions", () => {
    it("should have HOME route defined as /", () => {
      expect(ROUTES.HOME).toBe("/");
    });

    it("should have FAVOURITES route defined", () => {
      expect(ROUTES.FAVOURITES).toBe("/favourites");
    });

    it("should have MOVIE_DETAILS route with :id parameter", () => {
      expect(ROUTES.MOVIE_DETAILS).toBe("/movies/:id/details");
      expect(ROUTES.MOVIE_DETAILS).toContain(":id");
    });

    it("should have ABOUT route defined", () => {
      expect(ROUTES.ABOUT).toBe("/about-us");
    });

    it("should have NOT_FOUND route as wildcard", () => {
      expect(ROUTES.NOT_FOUND).toBe("*");
    });
  });

  describe("route integrity", () => {
    it("should have all expected routes", () => {
      const expectedRoutes = [
        "HOME",
        "FAVOURITES",
        "MOVIE_DETAILS",
        "ABOUT",
        "NOT_FOUND",
      ];

      expectedRoutes.forEach((route) => {
        expect(ROUTES).toHaveProperty(route);
      });
    });

    it("should not have undefined routes", () => {
      Object.values(ROUTES).forEach((route) => {
        expect(route).toBeDefined();
        expect(typeof route).toBe("string");
      });
    });

    it("all routes except NOT_FOUND should start with /", () => {
      Object.entries(ROUTES).forEach(([key, value]) => {
        if (key !== "NOT_FOUND") {
          expect(value.startsWith("/")).toBe(true);
        }
      });
    });
  });

  describe("route usage helpers", () => {
    it("should be usable to generate movie detail URLs", () => {
      const movieId = 123;
      const detailUrl = ROUTES.MOVIE_DETAILS.replace(":id", movieId);
      expect(detailUrl).toBe("/movies/123/details");
    });
  });
});
