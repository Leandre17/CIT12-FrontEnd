import React, { useEffect, useState } from "react";
import { useUser } from "../Contexts/UserContext";
import fetchData from "../Components/FetchData";

const RatingPage = () => {
  const { user } = useUser();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (ratingId) => {
    const url = `api/UserRating/${ratingId}`;
    const response = await fetchData(url, false, "DELETE");
    if (response === "Rating deleted successfully.") {
      setRatings((prevRatings) => {
        const newRatings = prevRatings.filter(
          (rating) => rating.ratingId !== ratingId
        );
        return newRatings;
      });
    }
  };

  useEffect(() => {
    const fetchRatings = async () => {
      if (!user || !user.id) {
        setError("You must be logged in to view ratings.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetchData(`api/UserRating/User/${user.id}`);
        console.log("Fetched Ratings:", response);

        if (Array.isArray(response)) {
          setRatings(response);
        } else {
          throw new Error("Unexpected response format.");
        }
      } catch (err) {
        console.error("Failed to fetch ratings:", err);
        setError("Failed to load ratings.");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [user]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1 style={{ color: "red" }}>{error}</h1>;

  return (
    <div>
      <h1>Your Ratings</h1>
      {ratings.length > 0 ? (
        ratings.map((rating, index) => (
          <div key={rating.ratingId} style={{ padding: "10px 0" }}>
            <h3>Movie ID: {rating.tconst}</h3>
            <p>
              <strong>Rating:</strong> {rating.rating}/10
            </p>
            <button onClick={() => handleDelete(rating.ratingId)}>Delete</button>
            {index !== ratings.length - 1 && <hr />}{" "}
            {/* Add a line except for the last rating */}
          </div>
        ))
      ) : (
        <p>No ratings available.</p>
      )}
    </div>
  );
};

export default RatingPage;
