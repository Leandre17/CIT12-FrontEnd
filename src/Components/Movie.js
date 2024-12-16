import { useNavigate } from "react-router-dom";

function Movie({ movie }) {
  const navigate = useNavigate();
  if (!movie || !movie.movie_Title) {
    return <div className="movie-error">Invalid movie data</div>;
  }
  if (movie.movie_Id) {
    return (
      <div className="movie">
        <button onClick={() => navigate(`/movie/${movie.movie_Id}`)}>
          <h3>
            {movie.movie_Title}{" "}
            <span style={{ fontWeight: "normal" }}>
              ({movie.rating || "N/A"})
            </span>
          </h3>
          <img
            src={movie.poster_path || "https://via.placeholder.com/150"}
            alt={movie.movie_Title || "No poster available"}
            style={{ width: "150px", height: "225px" }}
          />
        </button>
      </div>
    );
  }
  return (
    <div className="movie">
      <h3>
        {movie.movie_Title}{" "}
        <span style={{ fontWeight: "normal" }}>({movie.rating || "N/A"})</span>
      </h3>
      {movie.movie_Id && (
        <button onClick={() => navigate(`/movie/${movie.movie_Id}`)}>
          {movie.movie_Title}
        </button>
      )}
      <img
        src={movie.poster_path || "https://via.placeholder.com/150"}
        alt={movie.movie_Title}
        style={{ width: "150px", height: "225px" }}
      />
    </div>
  );
}

export default Movie;
