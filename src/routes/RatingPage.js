import React from "react";
import { useEffect, useState } from "react";
import Rating from "../Components/Rating";
import fetchData from "../Components/FetchData";

const RatingPage = ({ user }) => {
  const [rating, setRating] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData("api/UserRating")
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
