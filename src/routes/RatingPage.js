import React from "react";
import { useEffect, useState } from "react";
import Rating from "../Components/Rating";

const RatingPage = ({ user }) => {
  const [rating, setRating] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5221/rating") // endpoint don't exist
      .then((response) => response.json())
      .then((data) => {
        setRating(data);
        setLoading(false);
      });
  }, []);
  if (Loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>Your rating</h1>
      {rating.map((item) => Rating(item))}
    </div>
  );
};

export default RatingPage;
