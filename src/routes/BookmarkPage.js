import React, { useEffect, useState } from "react";
import { useUser } from "../Contexts/UserContext";
import fetchData from "../Components/FetchData";

const BookmarkPage = () => {
  const { user } = useUser(); // Get user from UserContext
  const [bookmarks, setBookmarks] = useState([]); // Stores bookmark items
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(0); // Current pagination page
  const [totalPages, setTotalPages] = useState(0); // Total pages returned from API
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user || !user.id) {
        setError("You must be logged in to view bookmarks.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetchData(
          `api/Bookmark/Get/${user.id}?page=${currentPage}&pageSize=10`
        );

        console.log("API Response:", response); // Debugging the structure

        if (response && response.items) {
          setBookmarks(response.items); // Extract items array
          setTotalPages(response.numberPages || 1); // Extract total pages
          setError(null); // Clear errors
        } else {
          setBookmarks([]); // Fallback for empty response
          setError("No bookmarks found for this user.");
        }
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
        setError("Failed to load bookmarks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [user, currentPage]);

  // Handlers for pagination
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(0, prev - 1));
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  // User not logged in fallback
  if (!user) {
    return <h1 style={{ color: "red" }}>Please log in to view bookmarks.</h1>;
  }

  // Loading state
  if (isLoading) return <h1>Loading...</h1>;

  // Error state
  if (error) return <h1 style={{ color: "red" }}>{error}</h1>;

  return (
    <div className="bookmark-page">
      <h1>Your Bookmarks</h1>

      {/* Check if bookmarks exist */}
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark, index) => (
          <div key={bookmark.bookmarkId} style={{ padding: "10px 0" }}>
            <h3>Item Type: {bookmark.itemType}</h3>
            <p>
              <strong>Item ID:</strong> {bookmark.itemId}
            </p>
            <p>
              <strong>Annotation:</strong>{" "}
              {bookmark.annotation || "No annotation"}
            </p>
            {index !== bookmarks.length - 1 && <hr />}{" "}
            {/* Add a line except for the last bookmark */}
          </div>
        ))
      ) : (
        <p>No bookmarks available.</p>
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookmarkPage;
