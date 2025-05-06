import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieById } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    if (!movieId) return;
    const getMovieDetails = async () => {
      try {
        setLoader(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const date = new Date(movie.release_date);

  return (
    <div>
      {!loader ? (
        <div className={css.wrapper}>
          <Link to={goBackRef.current}>Go back</Link>
          <div>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
            <div>
              <h2>
                {movie.title} ({date.getFullYear()})
              </h2>
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <p className={css.header}>Genres</p>
              <ul>
                {movie.genres?.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <hr></hr>
          <p>Additional information</p>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <hr></hr>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MovieDetailsPage;
