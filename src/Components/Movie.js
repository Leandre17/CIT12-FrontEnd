import { useNavigate } from "react-router-dom";


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
