import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      searchParams.delete("query");
      return setSearchParams(searchParams);
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (!query) return;
        setLoader(true);
        const data = await getMoviesByQuery(query);
        setMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [query]);

  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {loader && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
