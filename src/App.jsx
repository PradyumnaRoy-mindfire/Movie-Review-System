import { BrowserRouter, Routes, Route } from "react-router-dom";
import Genres from './components/api/FetchGenresFromApi';
import Favourite from "./components/pages/Favourite";
import Error404NotFound from "./components/pages/Error404NotFound";
import { Toaster } from 'react-hot-toast';
import MovieDetails from "./components/pages/MovieDetails";

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
        <Route path="/" element={<Genres />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="*" element={<Error404NotFound />} />
        <Route path="/movies/:id/details" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
