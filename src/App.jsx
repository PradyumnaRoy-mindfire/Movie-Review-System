import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Favourite from "./components/pages/Favourite";
import Error404NotFound from "./components/pages/Error404NotFound";
import { Toaster } from 'react-hot-toast';
import MovieDetails from "./components/pages/MovieDetails";
import AboutUs from "./components/pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right"  toastOptions={{
        className: '',
        duration: 5000,
        removeDelay: 1000,
        style: {
          marginTop: '65px',
        }
      }}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourite />} />
        <Route path="/movies/:id/details" element={<MovieDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<Error404NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
