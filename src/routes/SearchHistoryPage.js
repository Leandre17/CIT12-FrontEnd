import React, { useEffect, useState } from "react";
import { useUser } from "../Contexts/UserContext";
import fetchData from "../Components/FetchData";

// Utility function to format date and time
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  });
};

const SearchHistoryPage = () => {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !user.id) {
        setError("You must be logged in to view search history.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetchData(`api/SearchHistory/User/${user.id}`);
        console.log("Fetched Search History:", response);

        // Check if response is valid
        if (response && Array.isArray(response)) {
          setHistory(response);
        } else {
          throw new Error("Unexpected response format.");
        }
      } catch (err) {
        console.error("Failed to fetch search history:", err);
        setError("Failed to load search history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  // Loading and Error States
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1 style={{ color: "red" }}>{error}</h1>;

  return (
    <div>
      <h1>Search History</h1>
      {history.length > 0 ? (
        history.map((item) => (
          <div
            key={item.searchId}
            style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
          >
            <h3>Search Term: {item.searchTerm}</h3>
            <p>
              <strong>Date:</strong> {formatDateTime(item.searchDate)}
            </p>
          </div>
        ))
      ) : (
        <p>No search history available.</p>
      )}
    </div>
  );
};

export default SearchHistoryPage;
