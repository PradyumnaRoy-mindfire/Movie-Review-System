import FetchMoviesFromApi from '../components/api/FetchMoviesFromApi';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-700 via-purple-900 to-gray-700 flex flex-wrap justify-center items-center">
          <Header />
          <FetchMoviesFromApi/>
      </div>
    </>
  )
}

export default Home