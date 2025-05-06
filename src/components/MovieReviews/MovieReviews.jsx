import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../../services/api";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);

  const { movieId } = useParams();
  useEffect(() => {
    if (!movieId) return;
    const getData = async () => {
      try {
        setLoader(true);
        const data = await getReviewsById(movieId);
        setReviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      <ul>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <p className={css.heading}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        {!loader && reviews.length === 0 && (
          <p>We don't have any reviews for this movie.</p>
        )}
      </ul>
    </>
  );
};

export default MovieReviews;
