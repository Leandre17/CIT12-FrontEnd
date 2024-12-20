import React, { useEffect, useState } from "react";
import { useUser } from "../Contexts/UserContext";
import fetchData from "../Components/FetchData";
import Bookmark from "../Components/Bookmark";

const BookmarkPage = () => {
  const { user } = useUser(); // Get user from UserContext
  const [bookmarks, setBookmarks] = useState([]); // Stores bookmark items
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      console.log("Deleting bookmark with ID:", bookmarkId);
      const response = await fetchData(
        `api/Bookmark/Delete/${bookmarkId}`,
        false,
        "DELETE"
      );
      if (response === "Bookmark deleted successfully.") {
        setBookmarks((prevBookmarks) => {
          const newBookmarks = prevBookmarks.filter(
            (bookmark) => bookmark.bookmarkId !== bookmarkId
          );
          return newBookmarks;
        });
      } else {
        console.error("Failed to delete bookmark:", response);
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user || !user.id) {
        setError("You must be logged in to view bookmarks.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetchData(`api/Bookmark/Get/${user.id}`);

        if (Array.isArray(response) && response.length > 0) {
          setBookmarks(response);
          setError(null);
        } else {
          setBookmarks([]);
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
  }, [user]);

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
      {bookmarks.length === 0 ? (
        <p>You haven't bookmarked any items yet.</p>
      ) : (
        <div className="bookmarks-container">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.bookmarkId}>
              <Bookmark
                bookmark={{
                  Id: bookmark.bookmarkId,
                  itemType: bookmark.itemType,
                  itemId: bookmark.itemId,
                  annotation: bookmark.annotation,
                }}
              />
              <button onClick={() => handleDeleteBookmark(bookmark.bookmarkId)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
