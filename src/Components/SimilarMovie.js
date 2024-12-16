import React from "react";
import { useEffect } from "react";
import fetchData from "./FetchData";
import {
  Pagination,
  handlePreviousPage,
  handleNextPage,
} from "../Components/Pagination";
import Movie from "./Movie";

function SimilarMovie({ movie_Title }) {
  const [movies, setmovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [error, setError] = React.useState(null);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData(
        `api/SimilarMoviesDb/Search?movieTitle=${movie_Title}&page=${currentPage}`
      );

      setmovies(data.items);
      setTotalPages(data.numberPages);
      setError(null);
    } catch (err) {
      setError(err.message || "An unknown error occurred");
      setmovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [movie_Title]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    if (error.includes("404")) {
      return (
        <>
          <h3>Similar Movies : </h3>
          <div>No similar movies found.</div>;
        </>
      );
    }
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h3>Similar Movies : </h3>

      {movies.length === 0 ? (
        <p>No similar movies found.</p>
      ) : (
        <>
          <div className="movie-page">
            {movies
              .filter((item) => item && item.movieName) // Validate each movie
              .map((item, index) => (
                <Movie
                  key={index}
                  movie={{
                    movie_Title: item.movieName,
                    poster_path: item.poster_path, // Ensure this is included
                  }}
                />
              ))}
          </div>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPreviousPage={() => handlePreviousPage(setCurrentPage)}
            onNextPage={() => handleNextPage(setCurrentPage)}
          />
        </>
      )}
    </>
  );
}

export default SimilarMovie;
