import { useEffect, useState } from "react";
import { getMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const data = await getMovies();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {loader && <Loader />}
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
