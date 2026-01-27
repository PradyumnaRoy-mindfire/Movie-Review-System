import FetchMoviesFromApi from '../components/api/FetchMoviesFromApi';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <div style={{
        background: 'linear-gradient(to bottom right, #111827, #581c87, #111827)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
          <Header />
          <FetchMoviesFromApi/>
      </div>
    </>
  )
}

export default Home