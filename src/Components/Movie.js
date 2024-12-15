import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "./FetchData";
import SimilarMovies from "./SimilarMovie";

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
        <h1>{movie.movie_Title}</h1>
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

function Movie({ movie }) {
  const navigate = useNavigate();
  if (!movie || !movie.movie_Title) {
    return <div className="movie-error">Invalid movie data</div>;
  }
  return (
    <div className="movie">
      <p>{movie.movie_Title}</p>
      {movie.movie_Id && (
        <button onClick={() => navigate(`/movie/${movie.movie_Id}`)}>
          {movie.movie_Title}
        </button>
      )}
      <img
        src={movie.poster_path || "https://via.placeholder.com/150"}
        alt={movie.movie_Title}
      />
    </div>
  );
}

export { MovieDetails, GetMovieActor };
export default Movie;
