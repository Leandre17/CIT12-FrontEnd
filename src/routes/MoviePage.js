import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../Components/FetchData";
import SimilarMovies from "../Components/SimilarMovie";

function GetMovieActor({ movie_Id }) {
  const navigate = useNavigate();
  const [Actors, setActors] = useState([]);
  useEffect(() => {
    fetchData(`api/Actor/movie/${movie_Id}`)
      .then((data) => setActors(data.items))
      .catch(console.error);
  }, [movie_Id]);
  if (!Actors) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {Actors.map((actor) => (
        <button onClick={() => navigate(`/actor/${actor.nconst}`)}>
          {actor.primaryname}
        </button>
      ))}
    </div>
  );
}

function MovieDetails({ movie_Id }) {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetchData(`api/MovieDetails/${movie_Id}`)
      .then(setMovie)
      .catch(console.error);
  }, [movie_Id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <h1>{movie.primarytitle || movie.originaltitle}</h1>
        <p>Start Year: {movie.startyear}</p>
        <p>End Year: {movie.endyear}</p>
        <p>Genre: {movie.genres}</p>
        <GetMovieActor movie_Id={movie_Id} />
      </div>
      <div>
        <SimilarMovies movie_Id={movie_Id} />
      </div>
    </>
  );
}

const MoviePage = () => {
  const { movie_Id } = useParams();

  return (
    <div>
      <MovieDetails movie_Id={movie_Id} />
    </div>
  );
};

export default MoviePage;
