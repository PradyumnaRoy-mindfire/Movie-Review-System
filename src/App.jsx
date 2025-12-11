import { BrowserRouter, Routes, Route } from "react-router-dom";
import Genres from './components/FetchGenresFromApi';
import Favourite from "./components/pages/Favourite";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right"  toastOptions={{
        className: '',
        duration: 5000,
        removeDelay: 1000,
        style: {
          marginTop: '60px',
        }
      }}/>
      <Routes>
        <Route path="/" element={<Genres />} />
        <Route path="/favourite" element={<Favourite />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
