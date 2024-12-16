import axios from "axios";
import { useState, useEffect } from "react";
const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzIxMDIxMzFjODI4ZWE1YjdhYWFjYjUwODZjMzIyZiIsIm5iZiI6MTczMTkzMTUwNS43NzMsInN1YiI6IjY3M2IyZDcxZGM0YmJjMDFjNjkxZGY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IoVhYqGNMiZPSccZ6Axm9XSd2XCqolLSWAPozi-fpf8";

const fetchData = async (url) => {
  try {
    const port = process.env.REACT_APP_BACKEND_PORT || 7182;
    const fullUrl = `https://localhost:${port}/${url}`;

    const response = await fetch(fullUrl);

    if (!response.ok) {
      console.log("response", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw to allow caller to handle
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

const ImageById = ({ id, name }) => {
  const [loading, setLoading] = useState(true);
  const [poster, setPoster] = useState(null);

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
        if (person) {
          setPoster(`https://image.tmdb.org/t/p/original${person.profile_path}`);
        }
        const movie = data.movie_results[0];
        if (movie) {
          setPoster(`https://image.tmdb.org/t/p/original${movie.poster_path}`);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setLoading(false);
      }
    };
    fetchPoster();
  }, [id]);

  if (loading) {
    return <div>Loading image...</div>;
  }
  return <img src={poster} alt={name} height="300" />;
};

export { fetchTMDBImages, MovieImage, ImageById };
export default fetchData;
