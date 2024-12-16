import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Movie from "../Components/Movie";
import axios from "axios";
import { useUser } from "../Contexts/UserContext"; // Import user context

// TMDB API Key and Base URL
const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzIxMDIxMzFjODI4ZWE1YjdhYWFjYjUwODZjMzIyZiIsIm5iZiI6MTczMTkzMTUwNS43NzMsInN1YiI6IjY3M2IyZDcxZGM0YmJjMDFjNjkxZGY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IoVhYqGNMiZPSccZ6Axm9XSd2XCqolLSWAPozi-fpf8";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Fetch movie posters from TMDB
const fetchTMDBImages = async (title) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: { query: title },
    });

    const movie = response.data.results[0];
    return movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;
  } catch (error) {
    console.error("TMDB fetch error:", error);
    return null;
  }
};

// Fetch search results and integrate TMDB poster URLs
const fetchSearchResults = async (keyword, page) => {
  if (!keyword) return null;

  try {
    const response = await fetch(
      `https://localhost:7182/api/BestMatch/Search?keyword1=${encodeURIComponent(
        keyword
      )}&page=${page}`
    );
    const data = await response.json();

    if (data && data.items) {
      const updatedItems = await Promise.all(
        data.items.map(async (item) => {
          const imageUrl = await fetchTMDBImages(item.movie_Title);
          return { ...item, poster_path: imageUrl };
        })
      );
      return { ...data, items: updatedItems };
    }
    return data;
  } catch (error) {
    console.error("Search fetch error:", error);
    return null;
  }
};

// Add search term to backend history
const addToSearchHistory = async (userId, searchTerm) => {
  try {
    await axios.post(
      "https://localhost:7182/api/SearchHistory/Add",
      null, // No body, parameters passed as query string
      {
        params: {
          userId: userId,
          searchTerm: searchTerm,
        },
      }
    );
  } catch (error) {
    console.error("Failed to add search term to history:", error);
  }
};

// Search results component
const SearchResults = ({ data, isLoading }) => {
  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No results found</div>;

  return (
    <div className="search-results">
      {data
        .filter((item) => item && item.movie_Title) // Ensure valid items
        .map((item) => (
          <Movie key={item.movie_Id} movie={item} />
        ))}
    </div>
  );
};

// Pagination component
const SearchPagination = ({ page, totalPages, onPreviousPage, onNextPage }) => (
  <div className="pagination">
    <button onClick={onPreviousPage} disabled={page <= 0}>
      Previous
    </button>
    <span>
      Page {page + 1} / {totalPages}
    </span>
    <button onClick={onNextPage} disabled={page >= totalPages - 1}>
      Next
    </button>
  </div>
);

// Main SearchPage component
const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser(); // Access the logged-in user

  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("Search") || "";

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm) return;

      setIsLoading(true);
      try {
        const data = await fetchSearchResults(searchTerm, page);
        if (data) {
          setSearchResults(data.items || []);
          setTotalPages(data.numberPages || 0);

          // Save search term to history for logged-in users
          if (user) {
            await addToSearchHistory(user.id, searchTerm);
          }
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [searchTerm, page, user]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchTerm(searchInput);
      setPage(0);
      navigate(`${location.pathname}?Search=${encodeURIComponent(searchInput)}`);
    } else {
      navigate(location.pathname);
      setSearchTerm("");
    }
  };

  const handlePreviousPage = () => setPage((prev) => Math.max(0, prev - 1));
  const handleNextPage = () => setPage((prev) => prev + 1);

  return (
    <div className="search-page">
      <div className="search-input" style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchTerm && <SearchResults data={searchResults} isLoading={isLoading} />}

      {searchResults.length > 0 && (
        <SearchPagination
          page={page}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
};

export default SearchPage;