import React from "react";
import { useParams } from "react-router-dom";
import { MovieDetails } from "../Components/Movie";
const MoviePage = () => {
  const { movie_Id } = useParams();

  return (
    <div>
      <h1>Movie Page</h1>
      <MovieDetails movie_Id={movie_Id} />
    </div>
  );
};

export default MoviePage;
