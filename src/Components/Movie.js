import { useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../Contexts/UserContext";
import fetchData from "../Components/FetchData";

function Movie({ movie }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const handleAddBookmark = async () => {
    if (!user || !user.id) {
      alert("You must be logged in to bookmark a movie.");
      return;
    }

    try {
      const annotation = "Bookmark for " + movie.movie_Title;
      const url = `api/Bookmark/Add?userId=${user.id}&itemType=m&itemId=${movie.movie_Id}&annotation=${annotation}`;

      const response = await fetchData(url, false, "POST");

      alert(response); // Should display "Bookmark added successfully."
    } catch (error) {
      console.error("Failed to add bookmark:", error);
      alert("Failed to add bookmark. Please try again.");
    }
  };
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
        <div>
          <button onClick={handleAddBookmark} className="add-bookmark-btn">
            Add Bookmark
          </button>
        </div>
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
