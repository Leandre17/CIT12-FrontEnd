import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Movie from "./Movie";
import fetchData from "./FetchData";
import { Pagination, handlePreviousPage, handleNextPage } from "./Pagination";

const fetchSearchResults = async (keyword, page) => {
  if (!keyword) return null;

  try {
    const response = await fetchData(
      `api/StructuredStringSearch/Search?titleOfMovie=${encodeURIComponent(keyword)}&page=${page}`
    );
    return await response;
  } catch (error) {
    console.error("Search fetch error:", error);
    return null;
  }
};

const SearchResults = ({ data, isLoading }) => {
  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No results found</div>;

  return (
    <div className="search-results">
      {data.map((item) => (
        <Movie key={item.movie_Id} movie={item} />
      ))}
    </div>
  );
};

const ExactSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [searchTerm, page]);

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

  return (
    <div className="search-page">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchTerm && (
        <SearchResults data={searchResults} isLoading={isLoading} />
      )}

      {searchTerm && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPreviousPage={() => handlePreviousPage(setPage)}
          onNextPage={() => handleNextPage(setPage)}
        />
      )}
    </div>
  );
};

export default ExactSearch;
