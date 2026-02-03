import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTopButton from "./components/ScrollToTopButton";
import LoadingEffect from "./components/animation/LoadingEffect";
import { ROUTES } from "./constants/routes";
import "./App.css";

// lazy loading and code splitting
const Home = lazy(() => import("./pages/Home"));
const Favourite = lazy(() => import("./pages/Favourite"));
const Error404NotFound = lazy(() => import("./pages/Error404NotFound"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTopButton />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            marginTop: "65px",
          },
        }}
      />

      <Suspense fallback={<LoadingEffect />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.FAVOURITES} element={<Favourite />} />
          <Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetails />} />
          <Route path={ROUTES.ABOUT} element={<AboutUs />} />
          <Route path={ROUTES.NOT_FOUND} element={<Error404NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
