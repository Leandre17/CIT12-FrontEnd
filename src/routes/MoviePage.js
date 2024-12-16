import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../Components/FetchData";
import SimilarMovies from "../Components/SimilarMovie";
import { ImageById } from "../Components/FetchData";
import { useUser } from "../Contexts/UserContext";

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
      {Actors.filter((actor) => actor.nconst).map((actor) => (
        <span className="actor-card" key={actor.nconst}>
          <button onClick={() => navigate(`/actor/${actor.nconst}`)}>
            <ImageById
              id={actor.nconst}
              name={actor.primaryname}
              height="100"
            />
            {actor.primaryname}
          </button>
        </span>
      ))}
    </div>
  );
}

function MovieDetails({ movie_Id }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const [rating, setRating] = useState(5);
  const handleRate = async () => {
    const url = `api/RateDb?userId=${user.id}&movieId=${movie_Id}&rating=${rating}`;
    const response = await fetchData(url, false, "POST");
    alert(response);
  };
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
  useEffect(() => {
    fetchData(`api/MovieDetails/${movie_Id}`)
      .then((data) => {
        setMovie(data);
      })
      .then(() => setLoading(false))
      .catch(setError);
  }, [movie_Id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div style={{ float: "left", width: "70%" }}>
        <h1>{movie.primarytitle || movie.originaltitle}</h1>
        {movie.startyear !== "    " && <p>Start Year: {movie.startyear}</p>}
        {movie.endyear !== "    " && <p>End Year: {movie.endyear}</p>}
        {movie.genres && <p>Genre: {movie.genres}</p>}
        <ImageById
          title={movie.primarytitle || movie.originaltitle}
          id={movie.tconst}
        />
        <br />
        <button onClick={handleAddBookmark}>Add Bookmark</button>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={handleRate} className="add-bookmark-btn">
          Rate
        </button>
        <h2>Actors</h2>
        <GetMovieActor movie_Id={movie_Id} />
      </div>
      <div style={{ float: "right", width: "30%" }}>
        <SimilarMovies
          movie_Title={movie.primarytitle || movie.originaltitle}
        />
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
