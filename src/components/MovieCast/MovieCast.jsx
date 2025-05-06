import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/api";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getCast = async () => {
      try {
        setLoader(true);
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      <ul className={css.wrapper}>
        {cast.length > 0 &&
          cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
                width={250}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        {!loader && cast.length === 0 && <p>No cast information</p>}
      </ul>
    </>
  );
};

export default MovieCast;
