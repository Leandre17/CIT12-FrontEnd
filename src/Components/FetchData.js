import axios from "axios";
import { useState, useEffect } from "react";
import noImage from "../images/no-image.svg";

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzIxMDIxMzFjODI4ZWE1YjdhYWFjYjUwODZjMzIyZiIsIm5iZiI6MTczMTkzMTUwNS43NzMsInN1YiI6IjY3M2IyZDcxZGM0YmJjMDFjNjkxZGY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IoVhYqGNMiZPSccZ6Axm9XSd2XCqolLSWAPozi-fpf8";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const BACKEND_BASE_URL = "https://localhost:7182"; // Backend API Base URL

/**
 * Fetch data from API.
 * @param {string} url - API endpoint or query (for TMDB).
 * @param {boolean} isTMDB - Whether the request is for TMDB or the backend.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE). Defaults to "GET".
 * @param {object|null} data - Data payload for POST/PUT requests.
 * @returns {Promise<any>} - API response data.
 */
const fetchData = async (url, isTMDB = false, method = "GET", data = null) => {
  try {
    const config = {
      method,
      url: isTMDB
        ? `${TMDB_BASE_URL}/search/movie`
        : `${BACKEND_BASE_URL}/${url}`,
      headers: isTMDB
        ? {
            accept: "application/json",
            Authorization: `Bearer ${TMDB_API_KEY}`,
          }
        : {
            "Content-Type": "application/json",
          },
      ...(data && { data }), // Include data for POST/PUT requests
    };

    if (isTMDB) {
      config.params = { query: url }; // For TMDB, 'url' is treated as the query
    }

    const response = await axios(config);

    // Process TMDB-specific data
    if (isTMDB) {
      const movie = response.data.results[0];
      return movie
        ? {
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            rating: movie.vote_average
              ? parseFloat(movie.vote_average).toFixed(1)
              : "N/A",
          }
        : { poster_path: null, rating: "N/A" };
    }

    // Return backend response
    return response.data;
  } catch (error) {
    console.error("Fetch data error:", error);
    throw error; // Rethrow for better error handling
  }
};

const fetchTMDBImages = async (title) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      title
    )}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    }
  );
  const data = response.data;
  return data.results[0]
    ? `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`
    : null;
};

const MovieImage = (title) => {
  const [loading, setLoading] = useState(true);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const fetchPoster = async () => {
      const poster = await fetchTMDBImages(title);
      setPoster(poster);
      setLoading(false);
    };
    fetchPoster();
  }, [title]);

  if (loading) {
    return <div>Loading image...</div>;
  }
  return <img src={poster} alt={title} height="300" />;
};

const ImageById = ({ id, name, height = "300" }) => {
  const [loading, setLoading] = useState(true);
  const [poster, setPoster] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const poster = await axios.get(
          `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${TMDB_API_KEY}`,
            },
          }
        );
        const data = poster.data;
        const person = data.person_results[0];
        const movie = data.movie_results[0];
        if (person && person.profile_path) {
          setPoster(
            `https://image.tmdb.org/t/p/original${person.profile_path}`
          );
        } else if (movie && movie.poster_path) {
          setPoster(`https://image.tmdb.org/t/p/original${movie.poster_path}`);
        } else {
          setError("No image available");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchPoster();
  }, [id]);

  if (loading) {
    return (
      <div>
        <img src={noImage} alt="Loading logo" height={height} />
      </div>
    );
  }
  if (error) {
    return <img src={noImage} alt="No image available" height={height} />;
  }
  return <img src={poster} alt={name} height={height} />;
};

export { fetchTMDBImages, MovieImage, ImageById };
export default fetchData;
