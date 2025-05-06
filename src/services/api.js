import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGYxMmE4MDc2MDY3ODY0YWQ1NmI1MzFiNzJkM2ExNiIsIm5iZiI6MTc0NjQ0NzM4NS43MDcsInN1YiI6IjY4MThhYzE5MjNiNzNhNDA3NDkxMzhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WRnXqvMLMAwV8TSU9HwXylVVQpCX0oEq-V19vYB--HY",
    Accept: "application/json",
  },
};

export const getMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const getReviewsById = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const getMoviesByQuery = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};
